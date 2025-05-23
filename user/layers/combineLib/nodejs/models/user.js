const mongoose = require('mongoose')

const user = {
    userName : {
        type : String
    },
    emailId : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}


const userSchema = new mongoose.Schema(user)
const User = mongoose.model('User', userSchema)

module.exports = User