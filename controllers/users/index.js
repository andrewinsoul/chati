const userServices = require("../../services/users");

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
      const user = await userServices.confirmUserIsUnique(
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
      const info = await userServices.createUser(
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

  static async connectClient(req, res) {
    try {
      const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      };
      const { userId } = req.query;
        // res.writeHead(200, headers);
        // res.write(`Client ${userId} has connected`);
        const resClone = {...res}
      await userServices.createUserConn(userId, resClone);
      console.log("I'M OK");
      //   request.on("close", async () => {
      //     await userServices.dropUserConn(userId);
      //     console.log(`client ${userId} has disconnnected`);
      //   });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = UserController;
