const { messageModel } = require("../../Models/messagesModel");
const { uploadAudio } = require("../FileUpload/audio");


module.exports.sendMsg=(req, res)=>{
    const {category, text, audioFile, videoFile, location} = req.body;
    
    // if(!!audioFile){
    //     uploadAudio(audioFile).then((audioUploadRes)=>{
    //         if(audioUploadRes === 'ENOTFOUND'){
    //             res.status(500).json({message: "Network error, please check your connection", success: false})
    //         }
    //         else{
    //             saveMsg({category, text, audioUploadRes, video, location}).then((saveRes)=>{
    //                 res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
    //             })
    //         }
            
    //     }).catch((err)=>{
    //         res.status(500).json({message: `${err.message}, please check your connection`, success: false})
    //     })
    // }
    if(!!videoFile){
             uploadAudio(videoFile).then((uRes)=>{
                console.log(uRes)
            // if(audioUploadRes === 'ENOTFOUND'){
            //     res.status(500).json({message: "Network error, please check your connection", success: false})
            // }
            // else{
            //     saveMsg({category, text, audioUploadRes, video, location}).then((saveRes)=>{
            //         res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
            //     })
            // }
            
        }).catch((err)=>{
            res.status(500).json({message: `${err.message}, please check your connection`, success: false})
        })
    }
    // else{
    //     saveMsg({category, text, video, location}).then((saveRes)=>{
    //         res.status(saveRes.status).json({message: saveRes.message, success: saveRes.success})
    //     })
    // }
    
    
}


const saveMsg=(data)=>{
    const {category, text, audioUploadRes, video, location} = data
    return messageModel.create({category, message: {text, audio:audioUploadRes, video}, location}).then((data)=>{
        return {message: "Message sent", success: true, suggestedMeasure: "This will be writing according to the cateory of the emergency", status: 200}
    }).catch((err)=>{
        return {message: err.message, success: false, status: 500}
    })   
}