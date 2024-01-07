import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbconnect=async ()=>{
    try {
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB CONNECTED, DB HOST${connectioninstance.connection.host}`)

    } catch (error) {
        console.log("ERROR TMKC:",error)
        process.exit(1)
    }    
}

export default dbconnect