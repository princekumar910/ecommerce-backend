const mongoose = require('mongoose')

const cartSchema = {
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: true
    }

}
const CartSchema = new mongoose.Schema(cartSchema)
const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart