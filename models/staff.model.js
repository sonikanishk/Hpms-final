const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
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
      designation : {
        type: String,
        required: true
      },
      shift : {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Staff', staffSchema);