const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')

async function addToCart (event , context){
    return {
    statusCode: 200,
    body : {"message"  :"addToCart"}
   }
}

exports.handler = addToCart