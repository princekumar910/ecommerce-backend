const mongoose = require('mongoose')
async function connectDB() {

    try {
        const connect  = await mongoose.connect(process.env.MongoUri , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (error) {
        
    }
}