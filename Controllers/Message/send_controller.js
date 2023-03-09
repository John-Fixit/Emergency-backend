const { messageModel } = require("../../Models/messagesModel");
const { uploadvFile, uploadaFile } = require("../FileUpload/uploadFile");


module.exports.sendMsg=async(req, res)=>{
    const {category, text, audioFile, videoFile, location} = req.body;

    if(!!audioFile || !!videoFile){
        let details = {category, text, location, audio: "", video: ""}
        await uploadaFile(audioFile).then((audioRes)=>{
            if(audioRes === 'ENOTFOUND'){
                console.log(audioRes)
                res.status(500).json({message: "Network error, please check your connection", success: false})
            }
            details.audio= audioRes.url
         })
         
         await uploadvFile(videoFile).then((videoRes)=>{
            details.video= videoRes.url
         })

         saveMsg(details).then((saveRes)=>{
            res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
        })

    }


    
    // if(!!audioFile){
    //     uploadFile(audioFile).then((audioUploadRes)=>{
    //         if(audioUploadRes === 'ENOTFOUND'){
    //             res.status(500).json({message: "Network error, please check your connection", success: false})
    //         }
    //         else{
    //             saveMsg({category, text, audioUploadRes, video, location}).then((saveRes)=>{
    //                 res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
    //             })
    //         }
    //     })   
    // .catch((err)=>{
    //         res.status(500).json({message: `${err.message}, please check your connection`, success: false})
    //     })
    // }
    // if(!!videoFile){
    //          uploadFile(videoFile).then((videoUploadRes)=>{  
    //             console.log(videoUploadRes)
    //         if(videoUploadRes === 'ENOTFOUND'){
    //             res.status(500).json({message: "Network error, please check your connection", success: false})
    //         }
    //         else{
    //             saveMsg({category, text, audioUploadRes, videoUploadRes, location}).then((saveRes)=>{
    //                 res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
    //             })
    //         }
            
    //     }).catch((err)=>{
    //         res.status(500).json({message: `${err.message}, please check your connection`, success: false})
    //     })
    // }
    else{
        saveMsg({category, text, location}).then((saveRes)=>{
            res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
        })
    }
    
    
}


const saveMsg=(data)=>{
    const {category, text, audio, video, location} = data
    return messageModel.create({category, message: {text, audio, video}, location}).then((data)=>{
        return {message: "Message sent", success: true, suggestedMeasure: "This will be writing according to the cateory of the emergency", status: 200}
    }).catch((err)=>{
        return {message: err.message, success: false, status: 500}
    })   
}