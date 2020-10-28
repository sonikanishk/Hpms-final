const User = require('../models/auth.model');
const Query = require('../models/query.model');
const Doc = require('../models/doctor.model');
const Staff = require('../models/staff.model');
const Donor = require('../models/donor.model');

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
        
        // console.log(colab);

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
  console.log(email);
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
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'Database connection error on user password forgot request'
              });
            } else {
              sgMail
                .send(emailData)
                .then(sent => {
                  // console.log('SIGNUP EMAIL SENT', sent)
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                  });
                })
                .catch(err => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
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