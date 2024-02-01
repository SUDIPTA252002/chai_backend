import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { fileUploaderCloudinary } from "../utils/coludinaryFileUpload.js";
import { apiResonse } from "../utils/apiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })
    const {fullname,username,emailid,password}=req.body
    console.log("email:",emailid)
    console.log("password:",password)

    if([fullname,username,emailid,password].some((fields)=>fields?.trim()===""))
    {
        throw new apiError(400,"PLEASE FILL ALL THE FIELDS")
    }

    const existedUser=User.findOne({
        $or:[{emailid},{password}]
    })

    if(existedUser)
    {
        throw new apiError(409,"User with username or email already exist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverimageLocalPath=req.files?.coverimage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new apiError(400,"Please Upload The Avatar File")
    }

    const avatar=await fileUploaderCloudinary(avatarLocalPath)
    const coverimage=await fileUploaderCloudinary(coverimageLocalPath)

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage?.url||"",
        emailid,
        password,
        username:username.toLowerCase()
    }
    )

    const createdUser=User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser)
    {
        throw new apiError(500,"something went wrong while registering")
    }

    return res.status(201).json(
        new apiResonse(200,createdUser,"user successfully registered")
    )
})

export {registerUser}