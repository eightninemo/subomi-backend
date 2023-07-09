const Doctor = require('../models/doctor_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const Medication = require('../models/medication_dart');

const id = uuidv4();

const doctorRegister = async (req, res) => {
    var userId = id
    var userName = req.body.username
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let doctor = new Doctor({
            doctorId: userId,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            speciliazation: req.body.speciliazation,
            address: req.body.address, 
            password: hashedPass
        })
        Doctor.findOne({username:userName}).then(user => {
            if(user){
            res.status(404).json({
                status: false,
                message: 'user exists'
            })
        }else{
            doctor.save()
            .then(response => {
                res.status(200).json({
                    status: true,
                    message: 'User Added Successfully',
                    data: response
                    })
                }).catch(error => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured',
                        })
                })
            }
        })
    })
}

    const doctorLogin = async (req, res, next) => {
        var username = req.body.username
        var password = req.body.password
        Doctor.findOne({username})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            status: false,
                            message: err
                        })
                    }
                    if(result){
                    //    let token = jwt.sign({userId: user.userId},'zxcvbnm',{expiresIn: '1h'})
                       res.status(200).json({
                        status: true,
                        message: 'Login Successful',
                        // token: token
                       })
                    }else{
                        res.status(404).json({
                            status: false,
                            message: 'Invalid Password',
                            
                        })
                    }
                })
            }
        })
    }


const prescribe = (req, res) => {
    const patientId = req.body.patientId
    let updatedData = {
        patientId: req.body.patientId,
        name: req.body.name,
        type: req.body.designation,
        reason: req.body.email,
        dosage: req.body.phone,
    }
    Medication.findOneAndUpdate({patentId: patientId}, {$push: {patients: updatedData}})
    .then(response => {
        res.status(200).json({
            status: true,
            message: 'employee updated successfully'
        })
    }).catch(error => {
        res.status(500).json({
            status: false,
            message: 'An error occured'
        })
    })
}

module.exports = {
        doctorRegister, doctorLogin, prescribe
     }