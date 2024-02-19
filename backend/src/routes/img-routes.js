const { Router } = require("express");
const controllers = require("../controllers");

const imgRoutes = Router();

//upload new img
imgRoutes.post("/add", controllers.img.CloudinaryImage);

module.exports = imgRoutes;