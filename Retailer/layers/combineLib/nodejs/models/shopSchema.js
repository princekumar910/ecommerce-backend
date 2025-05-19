const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
})

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;