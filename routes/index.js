const { Router } = require("express");
const userController = require("../controllers/users");

const v1Router = Router();

/**
 * @description simple welcome route
 * @returns {object} - object representing the welcome information
 */
v1Router.get("/", (_, res) =>
  res.status(200).json({
    success: true,
    message: "Everything seems to be working fine",
  })
);

v1Router.get("/connect", userController.connectClient);
v1Router.post("/signup", userController.signupUser);

module.exports = v1Router;
