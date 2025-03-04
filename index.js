require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const SignUp = require('./Modal/SignUpModal')
const Contact = require('./Modal/ContactInfor')
const Appointment = require('./Modal/Appointment')
const AddDoctor = require('./Modal/AddDoctor')

const port = 3000
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix+'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })



mongoose.connect(`mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@cluster0.kj5c3.mongodb.net/employ?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected!'));

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('./uploads'))



app.post("/login", (req, res) => {
  const {email, password} = req.body;
  SignUp.findOne({email : email})
  .then(user => {
      if(user) {
          if(user.password === password){
              res.json("Success")
          }else{
              res.json("The password is incorrect")
          }
      }else{
          res.json("No record existed")
      }
  })
})




app.post('/signUp', function (req, res) {
  console.log(req.body);
  let data =  new SignUp(req.body)
  data.save()
  res.send('data received')
  
})



app.get('/loginData',function(req,res){
  SignUp.find().then(data => res.json(data))
  .catch(err => res.status(400).json({ message: err.message }))  
})



app.post('/contact',function(req,res){
  let data = new Contact(req.body)
  data.save()
  res.send('data received')

})

app.get('/contact',function(req,res){
  Contact.findOne().then(data => res.json(data))
  .catch(err => res.status(400).json({ message: err.message }))

  
})




app.post('/appointment',upload.single("img"),function(req,res){
  console.log(req.body);
  let data = new Appointment({...req.body,img:req.file.path})
  data.save()
  res.send('data received')
  
  
})


app.get('/appointmentItem', async function(req,res){
  let data = await Appointment.find()
  res.json(data)
})


app.delete('/appointDelete/:id', async function(req,res){
  let data = await Appointment.findByIdAndDelete(req.params.id,req.body)
  res.send({message:"Service Deleted"})
  
})



app.post('/addDoctor',function(req,res){
  let data = new AddDoctor(req.body)
  data.save()
  res.send('data received')
})



app.get('/addDocItem',async function(req,res){
  let data = await AddDoctor.find()
  res.json(data)
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

