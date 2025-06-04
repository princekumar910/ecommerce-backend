const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')
const connectToDatabase = require('/opt/nodejs/utils/connectDB')
const aws = require('aws-sdk')
const ses = new aws.SES({ region: 'ap-south-1' });
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
      // send email to the user ;
        const otp = Math.floor(100000 + Math.random() * 900000);
            const params = {
               Source: 'princeKumar007p@gmail.com',
               Destination: {
                  ToAddresses: [email],
               },
               Message : {
                  Subject :{
                     Data : 'Email Verification',
                     Charset : 'UTF-8'
                  },
                  Body : {
                     Text : {
                        Data : `Your OTP is ${otp}`,
                        Charset : 'UTF-8'
                     }
                  }
               }
            }
            const sesResponse = await ses.sendEmail(params).promise();
            console.log('Email sent:', sesResponse);
      const userCreated = await User.create(user)
      if(userCreated){
          const token = jwt.sign({ email : userCreated.emailId}, process.env.JWT_SECRET )
          userCreated.token = token;
      }
      return {
       status : true,
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