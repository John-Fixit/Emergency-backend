const { orgModel } = require("../Models/orgModel");

module.exports.loginMiddleWare =(req, res, next)=>{
    const {email} = req.body;

    orgModel.findOne({email}, (err, data)=>{
        if(err){
            res.status(500).json({message: `Unexpected error, please check your connection`, success: false})
        }else{
            if(data){
                req.dataFromMiddleware = data;
                next();
            }else{
                res.status(400).json({message: 'The Organization email provided is not registered!', success: false})
            }
        }
    })

}