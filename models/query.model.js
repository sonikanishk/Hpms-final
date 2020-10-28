const mongoose = require('mongoose');

const querySchema = new mongoose.Schema(
    {
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
      },
      name: {
        type: String,
        trim: true,
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
      comment : {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      statee: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Query', querySchema);