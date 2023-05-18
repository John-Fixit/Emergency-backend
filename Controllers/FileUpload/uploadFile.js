const { cloudinaryConfig } = require("../../CloudinaryConfig")
cloudinaryConfig()
const cloudinary = require("cloudinary").v2;
let timeStamp = new Date().getTime();
module.exports.uploadAFile=(file)=>{
    let fileForm
    if(!!file){
       fileForm = file.split(";")[0].split(":")[1].split("/")[0]
    }
    return cloudinary.uploader.upload(file, {folder: `emergency_system/${fileForm}_files/`, public_id: timeStamp, resource_type: "auto"}).then((res)=>{
        return {fileForm, url: res.secure_url}
    }).catch((err)=>{
        return err.error.code
    })
}
module.exports.uploadVFile=(file)=>{
    let fileForm
    if(!!file){
       fileForm = file.split(";")[0].split(":")[1].split("/")[0]
    }
    return cloudinary.uploader.upload(file, {folder: `emergency_system/${fileForm}_files/`, public_id: timeStamp, resource_type: "auto"}).then((res)=>{
        return {fileForm, url: res.secure_url}
    }).catch((err)=>{
        return err.error.code
    })
}
