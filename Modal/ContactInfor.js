const mongoose = require('mongoose')
const {Schema} = mongoose;

const contactSchema = new Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    gender:String,
    date:String
})
module.exports = mongoose.model('Contact',contactSchema)