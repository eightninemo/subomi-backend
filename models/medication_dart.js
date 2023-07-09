const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
  type: {
    type: String,
  },
  reason: {
    type: String,
  },
  dosage: {
    type: String,
  },
});

const Medication = mongoose.model('Medication', medicationSchema)
module.exports = Medication