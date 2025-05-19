const jwt = require('jsonwebtoken');
const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js')
async function deleteItem(event, context) {
    try {
        await mongoConnect();
        const { itemId } = JSON.parse(event.body);
        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Item ID is required" })
            }
        }
        const verifyToken = event.headers.Authorization;
        if (!verifyToken) {
            return {
                status:false,
                statusCode: 401,
                body: JSON.stringify({ message: "Unauthorized" })
            }
        }
        const token = verifyToken.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const result = await Item.findOneAndDelete({ itemId: itemId + " " + decode.email });
        if (!result) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Item not found" })
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item deleted successfully", result })
        };
    } catch (error) {
        console.error("Error deleting item:", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error })
        }
    }
}
exports.handler = deleteItem;