const app = require("express");
const orgRoute = app.Router();
const {addOrg, login, authorize} = require("../../Controllers/Oganization/auth_controller");
const { loginMiddleWare } = require("../../Middlewares/loginEmailMiddleware");
const { getOrgDetail, getAllOrg } = require("../../Controllers/Oganization/get_controller");

orgRoute.post("/addOrg", addOrg)
orgRoute.post("/login", loginMiddleWare, login);
orgRoute.get('/authorize', authorize)
orgRoute.get('/profile/:id', getOrgDetail)
orgRoute.get('/allOrgs', getAllOrg)
module.exports = {orgRoute};