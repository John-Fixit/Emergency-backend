const app = require("express");
const orgRoute = app.Router();
const {addOrg, login, authorize} = require("../../Controllers/Oganization/auth_controller");
const { getMsg } = require("../../Controllers/Oganization/get_controller");
const { loginMiddleWare } = require("../../Middlewares/loginEmailMiddleware");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", loginMiddleWare, login);
orgRoute.get('/authorize', authorize)
orgRoute.get("/:category", getMsg)

module.exports = {orgRoute};