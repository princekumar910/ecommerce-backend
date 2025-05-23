const mongoose = require('mongoose')
async function connectDB() {

    try {
        console.log("Connecting to MongoDB...")
        const connect  = await mongoose.connect(process.env. MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to database")
    } catch (error) {
        console.error("error connecting to database" , error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "error connecting to database",
                error: error.message
            })
        }
    }
}
module.exports = connectDB ;