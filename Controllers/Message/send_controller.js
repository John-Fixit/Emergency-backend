const { messageModel } = require("../../Models/messagesModel");

module.exports.sendMsg=(req, res)=>{
    const {category, text, voice, video, location} = req.body;

    messageModel.create({category, message: {text, voice, video}, location}).then((data)=>{
        console.log(data)
        res.status(200).json({message: "Your Organization has been added successfully", success: true});
    }).catch((err)=>{
        res.status(500).json({message: err.message, success: false});
    })

}

