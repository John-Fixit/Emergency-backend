const { orgModel } = require("../../Models/orgModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
module.exports.addOrg = (req, res) => {
  const { name, email, mobile, category, password } = req.body;
  orgModel
    .create({ name, email, mobile, password, category })
    .then((data) => {
      res.status(200).json({
        message: "Your Organization has been created successfully",
        success: true,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).json({
          message: `Name or Email of the Organization already exist`,
          success: false,
        });
      } else {
        res.status(500).json({
          message: `${err.message}: Please check your connection`,
          success: false,
        });
      }
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.dataFromMiddleware;
  await bcrypt.compare(req.body.password, password, (err, same) => {
    if (err) {
      res
        .status(500)
        .json({
          message:
            "Unexpected error! please check your connection and try again",
          success: false,
        });
    } else {
      if (same) {
        //correct password
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "48h",
        });
        res
          .status(200)
          .json({
            message: "Successfull",
            success: true,
            user_detail: req.dataFromMiddleware,
            token,
          });
      } else {
        res
          .status(401)
          .json({
            message: "Password you entered is incorrect, try again!",
            status: false,
          });
      }
    }
  });
};

module.exports.authorize = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Expired token supplied", success: false });
    } else {
      orgModel.findOne({ email: result.email }, (err, data) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
        } else {
          res
            .status(200)
            .json({ message: "successfull", success: true, user_detail: data });
        }
      });
    }
  });
};
