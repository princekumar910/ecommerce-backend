const mongoose = require('mongoose')

const user = {
    userName : {
        type : String
    },
    emailId : {
        type : String,
        required : true
    },
    password : {
        type : String
    }
}


const userSchema = new mongoose.Schema(user)
const User = mongoose.model('User', userSchema)

module.exports = User