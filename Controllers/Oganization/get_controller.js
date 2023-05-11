const { orgModel } = require('../../Models/orgModel');
module.exports.getOrgDetail=(req, res)=>{
    const id = req.params.id;
    orgModel.find({id}, (err, data)=>{
        if(err){
            res.status(500).json({message: "Internal server error, please check your connection!", success: false});
        }
        else{
           console.log(data)
        //    res.status(200).json({message: "Successfull", detail: data, success: true});
        }
    })
}   