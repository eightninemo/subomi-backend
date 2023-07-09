const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  speciliazation: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor