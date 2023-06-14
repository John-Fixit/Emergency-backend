const app = require("express");
const orgRoute = app.Router();
const {addOrg, login, authorize} = require("../../Controllers/Oganization/auth_controller");
const { loginMiddleWare } = require("../../Middlewares/loginEmailMiddleware");
const { getOrgDetail, getAllOrg } = require("../../Controllers/Oganization/get_controller");
const { checkEmailMiddleware } = require("../../Middlewares/checkEmailMiddleware");
const { updateOrgDetail } = require("../../Controllers/Oganization/updateController");
const { validateOrgEmail } = require("../../Middlewares/validateOrgEmail");

orgRoute.post("/addOrg", validateOrgEmail, addOrg)
orgRoute.post("/login", loginMiddleWare, login);
orgRoute.get('/authorize', authorize)
orgRoute.get('/profile/:id', getOrgDetail)
orgRoute.get('/allOrgs', getAllOrg)
orgRoute.patch("/update-org", checkEmailMiddleware, updateOrgDetail)
module.exports = {orgRoute};