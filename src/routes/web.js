import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/users", homeController.getCRUD);
  router.post("/create-user", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/log-in", userController.handleLogIn);
  router.post("/api/sign-up", userController.handleSignUp);

  return app.use("/", router);
};

module.exports = initWebRoutes;
