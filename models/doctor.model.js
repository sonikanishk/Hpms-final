const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
    {
    name: {
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
      address: {
        type: String,
        required: true
      },
      number: {
        type: String,
        required: true
      },
      speciality : {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Doc', docSchema);