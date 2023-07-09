const express = require('express')
const router = express.Router()

const PatientController = require('../controllers/patient_controller')


router.post('/patient-register', PatientController.patientRegister)
router.post('/patient-login', PatientController.patientLogin)

module.exports = router