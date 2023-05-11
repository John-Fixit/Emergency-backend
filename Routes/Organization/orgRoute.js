const app = require("express");
const orgRoute = app.Router();
const {addOrg, login, authorize} = require("../../Controllers/Oganization/auth_controller");
const { loginMiddleWare } = require("../../Middlewares/loginEmailMiddleware");
const { getOrgDetail } = require("../../Controllers/Oganization/get_controller");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", loginMiddleWare, login);
orgRoute.get('/authorize', authorize)
orgRoute.get('/profile/:id', getOrgDetail)
module.exports = {orgRoute};