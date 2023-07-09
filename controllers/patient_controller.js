const Patient = require('../models/patient_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

const patientRegister = async (req, res) => {
    var userId = id
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let doctor = new Patient({
            patientId: userId,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            gender: req.body.gender,
            age: req.body.age,
            address: req.body.address, 
            password: hashedPass
        })
        Patient.findOne({patientId:userId}).then(user => {
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
                message: 'An error occured:'
            })
        })
        }
    })
    })
}

    const patientLogin = async (req, res, next) => {
        var email = req.body.email
        var password = req.body.password
        Patient.findOne({ email })
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
                        res.status(200).json({
                            status: false,
                            message: 'Invalid Password',
                            
                        })
                    }
                })
            }
        })
    }


module.exports = {
        patientRegister, patientLogin
     }