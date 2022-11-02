const { Router } = require("express");
const userController = require("../controllers/users");
const messageController = require("../controllers/messages");
const verifyUserAuth = require("../middlewares");
const GroupController = require("../controllers/groups");

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

// user routes
v1Router
  .get("/connect", userController.connectClient)
  .post("/signup", userController.signupUser)
  .post("/login", userController.loginUser)
  .get("/users/group", userController.fetchAllUsersInAGroup)

  // message routes
  .post("/send/message", verifyUserAuth, messageController.sendMessage)
  .get(
    "/fetch/latest/messages",
    verifyUserAuth,
    messageController.fetchLatestMessages
  )
  .get(
    "/fetch/latest/messages/group",
    verifyUserAuth,
    messageController.fetchLatestMessagesInGroup
  )
  .get(
    "/search/messages/",
    verifyUserAuth,
    messageController.searchMessagesBtwnUsers
  )
  .get(
    "/search/messages/group",
    verifyUserAuth,
    messageController.searchMessagesInAGroup
  )

  // group routes
  .post("/create/group", verifyUserAuth, GroupController.createGroup)
  .post("/create/user/group", verifyUserAuth, GroupController.userJoinGroup)
  .get("/user/groups", verifyUserAuth, GroupController.fetchAllGroupsOfAUser);

module.exports = v1Router;
