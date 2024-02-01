import mongoose,{Schema} from "mongoose";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    emailid:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    avatar:{
        type:String,    //cloudinary url
        required:true
    },
    coverimage:{
        type:String//cloudinary url
    },
    refreshToken:{
        type:String
    },
    password:{
        type:true,
        required:[true,'password is required']
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }]
},{
    timestamps:true
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return next()
    
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.emailid,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken=function(){
    jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN,{
        expiresIn:REFRESH_TOKEN_EXPIRY
    })

}

export const User=mongoose.model("User",userSchema)