const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')

async function registerUser (event , context){
   return {
    statusCode: 200,
    body : {"message"  :"registerUser"}
   }

}

exports.handler = registerUser