const express = require('express')
const router = express.Router()

const DoctorController = require('../controllers/doctor_controller')


router.post('/doctor-register', DoctorController.doctorRegister)
router.post('/doctor-login', DoctorController.doctorLogin)
router.post('/doctor-prescription', DoctorController.prescribe)

module.exports = router