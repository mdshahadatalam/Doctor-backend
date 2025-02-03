const mongoose = require('mongoose')
const {Schema} = mongoose;

const signUpSchema = new Schema({
    name:String,
    email:String,
    password:String
})
module.exports = mongoose.model('SignUp',signUpSchema)