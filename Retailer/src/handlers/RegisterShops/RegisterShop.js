const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js')
const Shop = require('/opt/nodejs/models/shopSchema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RegisterShop = async (event , context) => {
   try {
      await mongoConnect();
      const { email, name, location, password, phone } = JSON.parse(event.body);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      const newShop = {
            email,
            name,
            location,
            password : hashedPassword,
            phone
      }
      if(!email || !name || !location || !password || !phone) {
         return {
            statusCode: 400,
            body: JSON.stringify({ message: "All fields are required" })
         }
      }
      
      const result = await Shop.create(newShop);
      console.log("result", result);
      const token = jwt.sign({ email }, "123456789", { expiresIn: "1h" });
       return {
           statusCode: 200,
           body: JSON.stringify({ message: "Shop created successfully", token }),
       };
   } catch (error) {
       console.error("Error creating new shop:", error);
   }

};

exports.handler = RegisterShop;