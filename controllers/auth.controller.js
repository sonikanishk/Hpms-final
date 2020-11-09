const User = require('../models/auth.model');
const Query = require('../models/query.model');
const Doc = require('../models/doctor.model');
const Staff = require('../models/staff.model');
const Donor = require('../models/donor.model');
const Appointment = require('../models/appointment.model');
const Report = require('../models/reports.model');

const expressJwt = require('express-jwt');
const _ = require('lodash');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbhelper');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);
const mongoose = require('mongoose');

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: 'Email is taken'
        });
      }
    });
    const colab = {name,email,password};
    const user = new User(colab);

        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: 'Account activation Successful. Please Sign In'
            });
          }
        });
  }
};

exports.SignInController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Incorrect Email or Password'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '10h'
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      });
    });
  }
};
exports.requireSignin = () => expressJwt({
  secret: process.env.JWT_SECRET // req.user._id
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.'
      });
    }

    req.profile = user;
    next();
  });
};


exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.'
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'User with that email does not exist'
          });
        }

        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: '10m'
          }
        );

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Password Reset link`,
          html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
        };

        return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err, success) => {
            if (err) {
              
              return res.status(400).json({
                error:
                  'Database connection error on user password forgot request'
              });
            } else {
              sgMail
                .send(emailData)
                .then(sent => {
                  
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                  });
                })
                .catch(err => {
                  
                  return res.json({
                    message: err.message
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.ansQueryController = (req, res) => {
  const { email, answer, query } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Answer to your query `,
      html: `
                <h2>Hey! Hope you are doing well this is the response to your query you recently asked on HPMS website.</h2>
                <p> Queston:${query} </p>
                <p> Answer:${answer} </p>
                <hr/>
                <p> Thank You for your query. </p>
            `
    };
    sgMail
            .send(emailData)
            .then(sent => {
              
              return res.json({
                message: `Email has been sent to ${email}.`
              });
            })
            .catch(err => {
              
              return res.json({
                message: err.message
              });
            });
   
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: 'Something went wrong. Try later'
              });
            }

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'Error resetting user password'
                });
              }
              res.json({
                message: `Great! Now you can Sign In with your new password`
              });
            });
          }
        );
      });
    }
  }
};

exports.queryController = (req, res) => {
  const { email, name, number, city, statee, comment, address, zip } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {email,name,address,number,comment,city,statee,zip};
    const user = new Query(colab);

        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: 'Query Sent'
            });
          }
        });
  }
};

exports.addDoctorController = (req, res) => {
  const { email, name, phone, gender, address, speciality } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {name,email,gender,address,phone,speciality};
    const doctor = new Doc(colab);
        doctor.save((err, doctor) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: doctor,
              message: 'Query Sent'
            });
          }
        });
  }
};

exports.addReportController = (req, res) => {
  const { email, name, symptoms, number, department, insurance, gender } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {email,name,symptoms,number,department,insurance,gender};
    const doctor = new Report(colab);
        doctor.save((err, doctor) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: doctor,
              message: 'Query Sent'
            });
          }
        });
  }
};

exports.addDonorController = (req, res) => {
  const { email, first_name,last_name , number, gender, organ ,blood_group} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {first_name,last_name,email,gender,number,blood_group,organ};
    const doctor = new Donor(colab);
        doctor.save((err, doctor) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: doctor,
              message: 'Query Sent'
            });
          }
        });
  }
};

exports.addStaffController = (req, res) => {
  const { email, first_name,last_name , number, gender,designation,shift} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {first_name,last_name,email,gender,number,designation,shift};
    const doctor = new Staff(colab);
        doctor.save((err, doctor) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: doctor,
              message: 'Query Sent'
            });
          }
        });
  }
};

exports.queriesController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Query.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};
exports.userController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};

exports.deleteQueryController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Query.findByIdAndDelete(id)
    .then(()=>res.json('Query Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};

exports.deleteStaffController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Staff.findByIdAndDelete(id)
    .then(()=>res.json('Staff Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};

exports.deleteDonorController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Donor.findByIdAndDelete(id)
    .then(()=>res.json('Donor Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};
exports.deleteDoctorController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Doc.findByIdAndDelete(id)
    .then(()=>res.json('Doctor Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};

exports.deleteUserController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findByIdAndDelete(id)
    .then(()=>res.json('User Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};

exports.deleteAppointmentController = (req, res) => {
  const {id} = req.body;
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Appointment.findByIdAndDelete(id)
    .then(()=>res.json('Appointment Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));  
  }
};

exports.doctorController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Doc.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};

exports.staffController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Staff.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};

exports.donorController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Donor.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};

exports.appointmentController = (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Appointment.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};



exports.docController = (req, res) => {
  const { department,name } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if(department==="All" && name===""){
      Doc.find().then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(department!=="All" && name===""){
      Doc.find({speciality:department}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(department==="All" && name!==""){
      Doc.find({name:{$regex:name}}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      Doc.find({name:{$regex:name},speciality:department}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
  }
};

exports.stafffController = (req, res) => {
  const { department,name } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    Staff.find().then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    
  }
};

exports.donorsController = (req, res) => {
  const { bloodgrp,organ } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if(bloodgrp==='All' && organ==='All'){
      Donor.find().then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(bloodgrp!=='All' && organ==='All'){
      Donor.find({blood_group:bloodgrp}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(bloodgrp==='All' && organ!=='All'){
      Donor.find({organ:organ}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      Donor.find({organ:organ,blood_group:bloodgrp}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
    } 
  }
};

exports.reportsController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
      Report.find({email:email}).then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  }
};

exports.addAppointmentController = (req, res) => {
  const { drname, pname, email, time} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    const colab = {drname,pname,email,time};
    const appoint = new Appointment(colab);
        appoint.save((err, appoint) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: appoint,
              message: 'Query Sent'
            });
          }
        });
  }
};