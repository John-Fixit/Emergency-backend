const app = require("express");
const orgRoute = app.Router();
const {addOrg, login} = require("../../Controllers/Oganization/auth_controller");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", login)


module.exports = {orgRoute};