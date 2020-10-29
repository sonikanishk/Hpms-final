const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema(
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
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        default: 'admin'
      }
    },
    {
      timestamps: true
    }
  );
  adminSchema.methods = {
    authenticate: function(plainText) {
      return plainText === this.password;
    }
  };
  module.exports = mongoose.model('Admin', adminSchema);
