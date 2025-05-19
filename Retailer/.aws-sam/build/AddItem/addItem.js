const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js')
const Item = require('/opt/nodejs/models/ItemSchema.js');
const findItemById = require('/opt/nodejs/utils/findItemById.js');
const uploadImageToS3 = require('/opt/nodejs/utils/uploadImageToS3.js')
async function addItem(event, context) {
    try {
        console.log("before connection item" ,  Item.create({}))
      let connection =   await mongoConnect();
    //   console.log("after connection item" , Item.create({}))
    //   console.log("connection------>" , connection)
        const { name , price , description , AvailableQuantity, images , itemId } = JSON.parse(event.body);
        const newItem = {
            name,
            price,
            description,
            AvailableQuantity,
        }
        if (!name || !price || !description || !AvailableQuantity || !images || !itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields are required" })
            }
        }
        
        if(images.length == 0){
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Atleast a image is required" })
            }
        }

        const verifyToken = event.headers.Authorization;
        if (!verifyToken) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Unauthorized" })
            }
        }
        const token = verifyToken.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let imagesUrl = [];
        for(let i = 0 ; i < images.length ; i++){
         let url = await uploadImageToS3(images[i] , `${decode.email}-${itemId}-images-${i}`)
         imagesUrl.push(url)
        }
        const itemStatus = await findItemById(itemId + " " + decode.email);
        if(!itemStatus){
            newItem.itemId =  itemId + " " + decode.email;
            newItem.shopId = decode.email ;
            newItem.images = imagesUrl ;
            const result = await Item.create(newItem);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Item Added successfully", result })
            };
        }
        
        else{
            const result = await Item.findOneAndUpdate({ itemId: itemId + " " + decode.email }, {
                $set : {
                    AvailableQuantity : itemStatus.AvailableQuantity + AvailableQuantity,
                }
            }, { new: true });
            if(AvailableQuantity < 0){
                return {
                    statusCode: 200,
                    body : JSON.stringify({ message: "Item deleted successfully"})
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Item Added successfully", result })
            };
        }
    } catch (error) {
        console.log("Error creating new item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error })
        }
    }
}

exports.handler = addItem;