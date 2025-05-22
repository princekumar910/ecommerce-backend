const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')
const Authorization = require('/opt/nodejs/utils/verifyToken.js')
async function addToCart (event , context){
    const result  = await Authorization.verifyToken(event.headers.Authorization);
    // const verifyToken = event.headers.Authorization;
    // if (!verifyToken) {
    //     return {
    //         statusCode: 401,
    //         body: JSON.stringify({ message: "missing Authentication token" })
    //     }
    // }
    
    return {
    statusCode: 200,
    body : {"message"  :"addToCart"}
   }
}

exports.handler = addToCart