const {messageModel} = require('../../Models/messagesModel');
module.exports.getMsg=(req, res)=>{
    const category = req.params.category;
    messageModel.find({category: category}, (err, data)=>{
        if(err){
            res.status(500).json({message: "Internal server error, please check your connection!", success: false});
        }
        else{
            const formattedMsg = data.map((msg)=>{
                return {
                    _id: msg._id,
                    message: msg.message,
                    category: msg.category,
                    location: msg.location,
                    createdAt: msg.createdAt,
                    respond: msg.respond,
                    dateCreated: msg.createdAt.toLocaleDateString()
                }
            })
           res.status(200).json({message: "Successfull", allMessage: formattedMsg, success: true});
        }
    })
}   