const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
      },
      name: {
        type: String,
        trim: true,
        required: true
      },
      symptoms: {
        type: String,
        required: true
      },
      number: {
        type: String,
        required: true
      },
      department : {
        type: String,
        required: true
      },
      insurance: {
        type: String,
        required: true
      },
      gender: {
          type: String,
          required: true
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Report', reportsSchema);