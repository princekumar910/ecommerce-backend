const jwt = require('jsonwebtoken');
const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js')
const Item = require('/opt/nodejs/models/ItemSchema.js');
async function getItemById(event, context) {
    try {
        await mongoConnect();
        const { itemId } = event.pathParameters ;
        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Item ID is required" })
            }
        }
        const verifyToken = event.headers.Authorization;
        if (!verifyToken) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Unauthorized" })
            }
        }
        const result = await Item.find({itemId : itemId })
        console.log("==" , result )
        if(!result){
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Item not found" })
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item fetched successfully", result })
        };
    } catch (error) {
        
    }
}
exports.handler = getItemById;