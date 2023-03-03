const { cloudinaryConfig } = require("../../CloudinaryConfig")
cloudinaryConfig()
const cloudinary = require("cloudinary").v2;
let timeStamp = new Date().getTime();
module.exports.uploadAudio=(file)=>{
    return cloudinary.uploader.upload(file, {folder: "emergency_system/video_files/", public_id: timeStamp, resource_type: "auto"}).then((res)=>{
        return res.secure_url
    }).catch((err)=>{
        return err.error.code
    })
}
