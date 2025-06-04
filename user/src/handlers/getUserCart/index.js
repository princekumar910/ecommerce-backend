const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')

async function getUserCart (event , context){
   
   return {
    statusCode: 200,
    body : {"message"  :"getUserCart"}
   }
}

exports.handler = getUserCart