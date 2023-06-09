const { orgModel } = require("../Models/orgModel");

module.exports.checkEmailMiddleware=(req, res, next)=>{
    const {orgId, email} = req.body;
    orgModel.findOne({email: email}, (err, data)=>{
        if(err){
            res.status(500).json({message: `Unexpected error, please check your connection`, success: false})
        }else{
            if(data){
                if(data?._id == orgId){
                    next();
                }
                else{
                    res.status(400).json({message: 'The Email provided is useed by another organization!', success: false})
                }
            }else{
                next();
            }
        }
    })
}