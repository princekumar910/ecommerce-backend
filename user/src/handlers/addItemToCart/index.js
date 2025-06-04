const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('/opt/nodejs/models/user')
const Cart = require('/opt/nodejs/models/cart')
const Authorization = require('/opt/nodejs/utils/verifyToken.js')
async function addToCart (event , context){
    
    const result  = await Authorization(event.headers.Authorization);
//    console.log("result==>" , result)
     if(!result.status){
        return{
            statusCode: result.statusCode,
            body: result.body
        }

     }
    
    const userId = JSON.parse(result.body).decoded.email;
    const body = JSON.parse(event.body);
    const {itemId , quantity , price} = body;
    if(!itemId || !quantity || !price){
        return {
            statusCode: 400,
            body : {"message" : "Please provide all the required fields"}
        }
    }
    if(quantity < 1){
        return {
            statusCode: 400,
            body : {"message" : "Quantity must be at least 1"}
        }
    }
    if(price < 0){
        return {
            statusCode: 400,
            body : {"message" : "Price must be a positive number"}
        }
    }
    const cartItem = {
        userId: userId,
        productId : itemId,
        quantity: quantity,
        price : price
    }
    try {
        const cartCreated = await Cart.create(cartItem);
        if(cartCreated){
            return {
                statusCode: 200,
                body : {"message"  :"Item added to cart successfully" , "data" : cartCreated }
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body : {"message"  :"Failed to add item to cart" , "error" : error.message}
        }
    }
}

exports.handler = addToCart