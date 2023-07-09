const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const DoctorRoute = require('./routes/doctor_route')
const PatientRoute = require('./routes/patient_route')

// change connection string
mongoose.connect('mongodb+srv://subomi:subomidatabase@cluster0.pokqfol.mongodb.net/?retryWrites=true&w=majority', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.on('connected', () => {
    console.log('Databases connection established.')
})


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// upload files to database and also uploads folder
// app.use('/uploads', express.static('uploads'))


// server port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})

// set route with url
app.use('/doctor', DoctorRoute)
app.use('/patient', PatientRoute)