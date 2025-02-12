const mongoose = require('mongoose')
const {Schema} = mongoose;

const addDoctorSchema = new Schema({
    name:String,
    email:String,
    password:String,
    experience:String,
    fess:String,
    about:String,
    spe:String,
    addressOne:String,
    addressTwo:String,
})
module.exports = mongoose.model('AddDoctor',addDoctorSchema)