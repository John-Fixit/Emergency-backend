const { orgModel } = require("../../Models/orgModel");


 module.exports.addOrg= (req, res)=>{
    const { name, email, description, category } = req.body;

    orgModel.create({name, email, description, category}).then((data)=>{
        res.status(200).json({message: "Your Organization has been created successfully", success: true})
    }).catch((err)=>{
        if(err.code === 11000){
            res.status(409).json({message: `Name or Email of the Organization has already existed`, success: false})
        }
        else{
            res.status(500).json({message: `${err.message}: Please check your connection`, success: false})
        }
    })
}
