const { Router } = require("express");
const controllers = require("../controllers");
const { validateToken } = require("../middlewares/auth/passport");
const validatorRegister = require("../middlewares/validators");


const clientRoutes = Router();

//new client profile
clientRoutes.post("/register", validatorRegister, controllers.authClient.RegisterController);

//get All client profiles
clientRoutes.get("/profile", validateToken, controllers.client.ProfilesController);

//get One client profile
clientRoutes.get("/profile/:id", validateToken, controllers.client.ProfileController);

//update client profile
clientRoutes.put("/profile/:id", validateToken, controllers.client.UpdateController);

//delete client profile
clientRoutes.delete("/profile/:id", validateToken, controllers.client.DeleteController);

module.exports = clientRoutes;