const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  prescriptions:
    {
      type: Array,
      default: [],
    },
 
});


const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
