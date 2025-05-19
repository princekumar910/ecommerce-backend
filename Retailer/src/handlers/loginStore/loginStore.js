const mongoose = require('mongoose');
const mongoConnection = require('/opt/nodejs/utils/mongoConnect.js');
const Shop = require('/opt/nodejs/models/shopSchema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
async function storelogin(event , context) {
    try {
        await mongoConnection();
        const { email, password } = JSON.parse(event.body);
        const ShopDetails = await Shop.findOne({ email });
        if(!ShopDetails) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Shop not found" })
            }
        }
        console.log("ShopDetails", ShopDetails);  
        const isPasswordCorrect = await bcrypt.compare(password, ShopDetails.password);
        if(!isPasswordCorrect) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Incorrect password" })
            }
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY )
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful", token }),
        };
    } catch (error) {
         console.error("Error logging in:", error)
        
         return {
            statusCode: 500,
            body: JSON.stringify({ message: error })
         }
    }
    
}
exports.handler = storelogin;