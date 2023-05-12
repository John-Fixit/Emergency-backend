const { respondedModel, messageModel } = require("../../Models/messagesModel");
const HTTPRESPONSE = require('http-status-codes');
module.exports.getRespond=(req, res)=>{
    const category = req.params.category
    respondedModel.find({messageCategory: category}, (err, data)=>{
        // if(err){
        //     res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected error! please check your connection', success: false})
        // }else{
        //     console.log(data);

        // }
        err? res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected error! please check your connection', success: false}):
        res.status(HTTPRESPONSE.StatusCodes.OK).json({message: 'successfull', data, success: true})
    })
}
module.exports.sendRespond=(req, res)=>{
    const {messageId} = req.body
    respondedModel.create(req.body, (err, data)=>{
        err?
            res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected Error occurred, please check your connection!', success: false})
        :
            messageModel.findOneAndUpdate({_id: messageId}, {$set:{'respond': true}}, (err, result)=>{
                err?
                    res.status(HTTPRESPONSE.StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected Error occurred, please check your connection!', success: false}):
                res.status(HTTPRESPONSE.StatusCodes.OK).send({message: 'Successfull', success: true})
            })
    })
}