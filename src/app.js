import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

import  userRouter  from "./routes/use.routes.js"       //we can write any name if it is exported as default
app.use("/api/v1/users",userRouter)

export default app