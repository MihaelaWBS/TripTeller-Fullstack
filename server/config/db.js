const mongoose = require("mongoose");

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)
        console.log("Mongoose database connected")
        
    } 
    catch (error){
        console.log("Connection failed", error)
        process.exit(1)
    }
}

module.exports = connectDB;