const mongoose = require('mongoose')
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    img:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    gender:String,
    date:String,
    docName:String
})
module.exports = mongoose.model('Appointment',appointmentSchema)