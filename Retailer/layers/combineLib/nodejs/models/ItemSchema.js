const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    itemId : {
        type: String,
        required: true,
        unique: true,
    },
    AvailableQuantity : {
        type: Number,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    images :{
        type: [String],
        required: true,
    },
    shopId : {
        type: String,
        required: true,
    },
})

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;