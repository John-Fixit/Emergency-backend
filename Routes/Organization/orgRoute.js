const app = require("express");
const orgRoute = app.Router();
const {addOrg, login, authorize} = require("../../Controllers/Oganization/auth_controller");
const { getMsg } = require("../../Controllers/Oganization/get_controller");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", login)
orgRoute.get('/authorize', authorize)
orgRoute.get("/:category", getMsg)

module.exports = {orgRoute};