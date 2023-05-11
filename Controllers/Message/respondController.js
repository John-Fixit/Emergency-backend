const { respondedModel, messageModel } = require("../../Models/messagesModel");
const HTTPRESPONSE = require('http-status-codes');
module.exports.getRespond=(req, res)=>{
    console.log(req.params.messageId)
}
module.exports.sendRespond=(req, res)=>{
    const {messageId} = req.body
    respondedModel.create(req.body, (err, data)=>{
        if(err){
            res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected Error occurred, please check your connection!', success: false})
        }
        else{
            messageModel.findOneAndUpdate({_id: messageId}, {$set:{'respond': true}}, (err, result)=>{
                err?
                    res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected Error occurred, please check your connection!', success: false}):
                res.status(HTTPRESPONSE.StatusCodes.OK).send({message: 'Successfull', success: true})
            })
        }
    })
}