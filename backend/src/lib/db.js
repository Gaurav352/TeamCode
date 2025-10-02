import mongoose from "mongoose";


export const connectDB = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected",response.connection.host);
    } catch (error) {
        console.log("Failed to connect DB ",error);
    }
}