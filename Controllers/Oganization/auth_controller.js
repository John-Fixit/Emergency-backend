const { orgModel } = require("../../Models/orgModel");

module.exports.addOrg = (req, res) => {
  const { name, email, description, category } = req.body;

  orgModel
    .create({ name, email, description, category })
    .then((data) => {
      res
        .status(200)
        .json({
          message: "Your Organization has been created successfully",
          success: true,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(409)
          .json({
            message: `Name or Email of the Organization has already existed`,
            success: false,
          });
      } else {
        res
          .status(500)
          .json({
            message: `${err.message}: Please check your connection`,
            success: false,
          });
      }
    });
};

module.exports.login=(req, res)=>{
  const {email } = req.body;

  orgModel.findOne({email: email}, (err, data)=>{
    if(err){
      res.status(500).json({message: "Internal server error, please check your connection and try again", success: false})
    }
    else{
        if(data){
          const token = jwt.sign({email: data.email}, process.env.JWT_SECRET, {expiresIn: ''})
          res.status(200).json({message: "Successfull", success: true, user_detail: data, token})
        }
        else{
         res.status(400).json({message: 'The Organization email provided is not registered!', success: false})
        }
    }
  })
}


module.exports.authorize=(req, res)=>{
    // const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, result)=>{
        if(err){
          res.status(500).json({message: 'Expired token supplied', success: false});
        }
        else{
            console.log(result);
            orgModel.findOne({email: result.email}, (err, data)=>{
              if(err){
                console.log(err)
                res.status(500).json({message: 'Internal Server Error', success: false});
              }
              else{
                console.log(data) 
                    res.status(200).json({message: 'successfull', success: true, user_detail: data})
              }
            })
        }
    })
}
