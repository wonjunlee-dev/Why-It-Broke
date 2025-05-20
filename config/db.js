const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("DB connected");
    }
    catch (err) {
        console.error("DB Connection Error", err);
        process.exit(1);
    }
}

module.exports = connectDB;
