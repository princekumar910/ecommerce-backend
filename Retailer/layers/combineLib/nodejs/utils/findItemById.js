const mongoConnect = require('/opt/nodejs/utils/mongoConnect.js');
const Item = require('/opt/nodejs/models/ItemSchema.js');
async function findItemById(itemId){
    try {
        await mongoConnect();
        const item = await Item.findOne({itemId})
        if(!item){
            return false ;
        }
        else {
            return item ;
        }

    } catch (error) {
        console.log("Error finding item by ID:", error);
    }
}
module.exports = findItemById ;