const User = require('../models/admin.model');


const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbhelper');
const mongoose = require('mongoose');
const _ = require('lodash');

exports.adminregisterController = (req, res) => {
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
  

exports.adminSignInController = (req, res) => {
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
            errors: 'User with that email does not exist'
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