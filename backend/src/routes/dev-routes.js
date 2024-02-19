const { Router } = require("express");
const controllers = require("../controllers");
const { validateToken } = require("../middlewares/auth/passport");
const validatorRegister = require("../middlewares/validators");


const devRoutes = Router();

//new Dev profile
devRoutes.post("/register", validatorRegister ,controllers.authDev.RegisterController);

//get All dev profiles
devRoutes.get("/profile", validateToken, controllers.dev.ProfilesController);

//get One dev profile
devRoutes.get("/profile/:id", validateToken, controllers.dev.ProfileController);

//update dev profile
devRoutes.put("/profile/:id", validateToken, controllers.dev.UpdateController);

//delete dev profile
devRoutes.delete("/profile/:id", validateToken, controllers.dev.DeleteController);

module.exports = devRoutes;
