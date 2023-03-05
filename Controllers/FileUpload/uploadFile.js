const { cloudinaryConfig } = require("../../CloudinaryConfig")
cloudinaryConfig()
const cloudinary = require("cloudinary").v2;
let timeStamp = new Date().getTime();
module.exports.uploadFile=(file)=>{
    let fileForm = file.split(";")[0].split(":")[1].split("/")[0]
    return cloudinary.uploader.upload(file, {folder: `emergency_system/${fileForm}_files/`, public_id: timeStamp, resource_type: "auto"}).then((res)=>{
        return res.secure_url
    }).catch((err)=>{
        return err.error.code
    })
}
