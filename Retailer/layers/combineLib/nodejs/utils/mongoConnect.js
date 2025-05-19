const mongoose = require('mongoose');
// Track connection status
const mongoConnect = async () => {
    console.log(`MongoDB Connection at starting Ready State: ${mongoose.connection.readyState}`);
    if(mongoose.connection.readyState) {
        console.log("MongoDB already connected");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connection Ready State: ${conn.connection.readyState}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = mongoConnect;