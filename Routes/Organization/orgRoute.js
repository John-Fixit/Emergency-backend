const app = require("express");
const orgRoute = app.Router();
const {addOrg} = require("../../Controllers/Oganization/create_controller");

orgRoute.post("/addOrg", addOrg)


module.exports = {orgRoute};