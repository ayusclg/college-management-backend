
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()
export const DbConnect = async () => {
    try {
       const mongoInstance = await mongoose.connect(`${process.env.MONGODB_URI}`) 
    } catch (error) {
        console.log("erro in connecting Database", error)
        process.exit(1)
    }
}