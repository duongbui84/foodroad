import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/api/experiences", (req, res) => {
    return res.send("api experiences");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
