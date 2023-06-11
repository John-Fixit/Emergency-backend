const { orgModel } = require('../../Models/orgModel');
const {StatusCodes} = require('http-status-codes');
module.exports.getOrgDetail=(req, res)=>{
    const id = req.params.id;
    orgModel.findById({_id: id}, (err, data)=>{
        if(err){
            res.status(500).json({message: "Internal server error, please check your connection!", success: false});
        }
        else{
           res.status(200).json({message: "Successfull", detail: data, success: true});
        }
    })
}

module.exports.getAllOrg=(req, res)=>{
    orgModel.find((err, data)=>{
        if(err){ 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected error! please check your connection', success: false});
        }
        else{
            console.log(data);
            res.status(StatusCodes.OK).json({message:'successfull', success: true, result: data});
        }
    })
}