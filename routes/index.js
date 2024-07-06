const express = require("express");
const registerController = require("../controllers/RegisterController");
const loginController = require("../controllers/LoginController");
const userController = require("../controllers/UserController");
const videoController = require("../controllers/VideoController");
const categoryController = require("../controllers/CategoryController");

const verifyToken = require("../midlewares/auth");

const routes = express.Router();

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

routes.get("/users", verifyToken, userController.all);

routes.get("/videos", verifyToken, videoController.all);
routes.post("/videos", verifyToken, videoController.store);
routes.get("/videos/:id", verifyToken, videoController.show);
routes.put("/videos/:id", verifyToken, videoController.update);
routes.delete("/videos/:id", verifyToken, videoController.destroy);

routes.get("/categories", verifyToken, categoryController.all);
routes.post("/categories", verifyToken, categoryController.store);
routes.get("/categories/:id", verifyToken, categoryController.show);
routes.put("/categories/:id", verifyToken, categoryController.update);
routes.delete("/categories/:id", verifyToken, categoryController.destroy);

module.exports = routes;
