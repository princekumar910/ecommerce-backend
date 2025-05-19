const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js');
const jwt = require('jsonwebtoken');
const shopSchema = require('/opt/nodejs/models/shopSchema.js');
const itemSchema = require('/opt/nodejs/models/ItemSchema.js');
async function getAllItems(event, context) {
   try {
     await mongoConnect();
    const verifyToken = event.headers.Authorization;
    const token = verifyToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const email = decode.email;
    const result = await shopSchema.findOne({ email})
    if(!result) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Your shop doesn't exist" })
        }
    }
    const items = await itemSchema.find({ shopId: email });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Items fetched successfully", items })
      };
   } catch (error) {
    console.log("Error getting all items:", error);
   }
}

exports.handler = getAllItems;