import dotenv from "dotenv";
import dbconnect from "./db/index.js";
dbconnect()

dotenv.config(
    {
        path:'./env'
    }
)






/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app=express()

;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR",error)
            //process.exit(1)
        })

        app.listen(process.env.PORT||3000,()=>{
            console.log(`LISTENING TO PORT ${process.env.PORT||3000}`)
        })
    }
    catch(error)
    {
        console.log("ERROR",error)
        //process.exit(1)
    }

})()
*/