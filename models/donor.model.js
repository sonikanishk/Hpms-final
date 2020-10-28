const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,
        trim: true,
        required: true
      },
      lastname: {
        type: String,
        trim: true,
        required: true
      },  
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
      },
      gender: {
        type: String,
        required: true
      },
      number: {
        type: String,
        required: true
      },
      bloodgrp : {
        type: String,
        required: true
      },
      organ : {
        type: String,
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Donor', donorSchema);