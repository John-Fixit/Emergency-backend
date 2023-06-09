const { orgModel } = require("../../Models/orgModel");

module.exports.updateOrgDetail=(req, res)=>{
    console.log(req.body);
    const {orgId, name, email, mobile, location, description, websiteLink} = req.body;
    orgModel.findByIdAndUpdate({_id: orgId}, {$set: {name: name, email: email, mobile: mobile, location: location, description: description, websiteLink: websiteLink}}, {new: true}, (err, data)=>{
        if(err){
            res.status(500).json({message: `Unexpected error, please check your connection`, success: false})
        }else{
            if(data){
                res.status(200).json({message: 'Organization details updated successfully!', success: true})
            }else{
                res.status(400).json({message: 'Organization details not updated!', success: false})
            }
        }
    })
}