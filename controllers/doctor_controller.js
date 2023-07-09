const Doctor = require('../models/doctor_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

const doctorRegister = async (req, res) => {
    var userId = id
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
        Doctor.findOne({doctorId:userId}).then(user => {
            if(user){
            res.status(404).json({
                message: 'user exists'
            })
        }else{
            doctor.save()
            .then(response => {
            res.json({
                message: 'User Added Successfully',
                data: response
            })
        }).catch(error => {
            res.json({
                message: error
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
                            error: err
                        })
                    }
                    if(result){
                    //    let token = jwt.sign({userId: user.userId},'zxcvbnm',{expiresIn: '1h'})
                       res.status(200).json({
                        message: 'Login Successful',
                        token: token
                       })
                    }else{
                        res.status(200).json({
                            message: 'Invalid Password',
                            
                        })
                    }
                })
            }
        })
    }

module.exports = {
        doctorRegister, doctorLogin
     }