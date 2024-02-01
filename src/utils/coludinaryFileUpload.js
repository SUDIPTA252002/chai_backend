import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APIPASSWORD 
  });


  
const fileUploaderCloudinary=async (filePath)=>{
    try 
    {
        if(!filepath) return null

        const response=await cloudinary.uploader.upload(LocalfilePath,{
            resource_type:'auto'})
         console.log('FILE HAS BEEN UPLOADED SUCCESSFULLY',response.url)
         return response

    } catch (error) {
        fs.unlinkSync(LocalfilePath)//removing the locally saved file as the upload got failed
        return null
    }
}

export {fileUploaderCloudinary}