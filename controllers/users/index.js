const { UserServices } = require("../../services/users");
const { clientConnections } = require("../../constants");

class UserController {
  static async signupUser(req, res) {
    try {
      const { email, username, phone, password, avatar } = req.body;
      if (!email || !username || !phone || !password) {
        return res.status(422).json({
          success: false,
          message: "email, phone, password and username are all required",
        });
      }
      const user = await UserServices.confirmUserIsUnique(
        email,
        username,
        phone
      );

      if (JSON.parse(user).length) {
        return res.status(409).json({
          success: false,
          message: "user already exists",
        });
      }
      const info = await UserServices.createUser(
        email,
        username,
        phone,
        password,
        avatar
      );

      return res.status(201).json({
        success: true,
        data: {
          ...req.body,
          id: JSON.parse(info).inserted_hashes[0],
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async fetchAllUsersInAGroup(req, res) {
    try {
      if (!req.query.groupId) {
        return res.status(422).json({
          success: false,
          error: "groupId query param is required",
        });
      }
      const users = await UserServices.fetchUsersFromGroup(req.query.groupId);
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "An error occureds",
      });
    }
  }

  static async connectClient(req, res) {
    try {
      const { userId } = req.query;
      const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      };
      clientConnections[userId] = res;
      console.log(`Client ${userId} has connected`);
      res.writeHead(200, headers);
      req.on("close", () => {
        delete clientConnections[userId];
        console.log(`client ${userId} has disconnnected`);
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async loginUser(req, res) {
    console.log("<><> ", res.write);
    try {
      const { identity, password } = req.body;
      if (!identity || !password) {
        return res.status(422).json({
          success: false,
          message: "identity & password are required",
        });
      }
      const user = await UserServices.loginUser(identity, password);

      if (!JSON.parse(user).length) {
        return res.status(401).json({
          success: false,
          message: "wrong credentials supplied",
        });
      }
      return res.status(200).json({
        success: true,
        data: {
          identity,
          id: JSON.parse(user)[0].user_id,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
