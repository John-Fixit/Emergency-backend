const app = require("express");
const orgRoute = app.Router();
const {addOrg, login} = require("../../Controllers/Oganization/auth_controller");
const { getMsg } = require("../../Controllers/Oganization/get_controller");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", login)
orgRoute.get("/:category", getMsg)


module.exports = {orgRoute};