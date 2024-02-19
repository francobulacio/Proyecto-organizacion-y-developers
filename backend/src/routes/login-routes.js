const { Router } = require("express");
const controllers = require("../controllers");

const loginRoutes = Router();

//dev login
loginRoutes.post("/login", controllers.authDev.LoginController);

//client login
loginRoutes.post("/login", controllers.authClient.LoginController);

module.exports = loginRoutes;