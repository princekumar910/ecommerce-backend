const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')
const connectToDatabase = require('/opt/nodejs/utils/connectDB')
function validateEmail(email){
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}
async function registerUser (event , context){
   await connectToDatabase();
   const body = JSON.parse(event.body)
   const {userName , email  , password} = body ;
   if(!userName || !email || !password){
      return {
         statusCode : 400,
         body : {"message" : "Please provide all the required fields"}
      }
   }
   if(!validateEmail(email)){
      return {
         statusCode : 400,
         body : {"message" : "Please provide a valid email id"}
      }
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password , salt);
   const user = {
      userName : userName,
      emailId : email ,
      password : hashedPassword
   }
   try {
      
      // const userCreated2 = await User.create(user)
      const newUser = new User(user);
      console.log("newUser===>" , newUser)
      const userCreated = await newUser.save();
      return {
       statusCode: 200,
       body : {"message"  :"user registered successfully" , "data" : userCreated }
      }
   } catch (error) {
      if(error.code === 11000){
         return {
            statusCode :400,
            body : {"message" : "Email already exists , Please use another email id"}
         }
      }
      return{
         statusCode: 500,
         body : {"message"  :"user registration failed" , "error" : error.message}
      }
   }
   
}

exports.handler = registerUser;