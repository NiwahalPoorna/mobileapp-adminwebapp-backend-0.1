const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  nicNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  repassword: {
    type: String,
    required: true,
  },
  agree: {
    type: Boolean,
    required: true,
  },
});

const admin = new mongoose.model("admin", adminSchema);
module.exports = admin;

// const Admin = require('./models/adminModels');
// unique: true
