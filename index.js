require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const SignUp = require('./Modal/SignUpModal')




mongoose.connect(`mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@cluster0.kj5c3.mongodb.net/employ?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected!'));

app.use(express.json())
app.use(cors())



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

app.listen(3000)

