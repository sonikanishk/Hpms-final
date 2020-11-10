const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
    {
      drname: {
        type: String,
        trim: true,
        required: true
      },
      department: {
        type: String,
        trim: true,
        required: true
      }, 
      pname: {
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
      time: {
        type: String,
        default: '11AM'
      }, 
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Appointment', AppointmentSchema);