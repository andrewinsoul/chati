const { MessageServices } = require("../../services/messages");
const { UserServices } = require("../../services/users");
const { clientConnections } = require("../../constants");

class MessageController {
  static async sendMessage(req, res) {
    try {
      const { text, receiverId, groupId } = req.body;
      if (groupId) {
        const allUsersInGrp = await UserServices.fetchUsersFromGroup(groupId);
        JSON.parse(allUsersInGrp).map((user) => {
          clientConnections[user.user_id].write(`{
            message: ${text},
            senderId: ${req.key},
            time: ${new Date()}
          }\n\n`);
        });
      } else {
        clientConnections[receiverId].write(`{
          message: ${text},
          senderId: ${req.key},
          time: ${new Date()}
        }\n\n`);
      }
      await MessageServices.sendMessage(
        text,
        receiverId || null,
        groupId || null,
        req.key
      );
      res
        .status(200)
        .json({ success: true, message: "message sent successfully" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }

  static async fetchLatestMessages(req, res) {
    try {
      const { key } = req;
      const { clientId, limit, page } = req.query;
      if (!clientId) {
        return res.status(400).json({
          success: false,
          message: "clientId is required",
        });
      }
      const messages = await MessageServices.fetchMessagesBtwnUsers(
        key,
        clientId,
        limit || 20,
        page || 1
      );

      res.status(200).json({ success: true, messages });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error.message || "An error occured" });
    }
  }

  static async fetchLatestMessagesInGroup(req, res) {
    try {
      const { groupId, limit, page } = req.query;
      if (!groupId) {
        return res.status(400).json({
          success: false,
          message: "groupId is required",
        });
      }
      // check if user is in the group
      const messages = await MessageServices.fetchMessagesInAGroup(
        groupId,
        limit || 20,
        page || 1
      );

      res.status(200).json({ success: true, messages });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error.message || "An error occured" });
    }
  }

  static async searchMessagesBtwnUsers(req, res) {
    try {
      const { queryTerm, receiverId, limit, page } = req.query;
      if (!queryTerm || !receiverId) {
        return res.status(404).json({
          success: false,
          message: "queryTerm and receiverId is a required query param",
        });
      }
      const messages = await MessageServices.searchMesageBetweenUsers(
        queryTerm,
        req.key,
        receiverId,
        limit || 20,
        page || 1
      );
      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "An error occured",
      });
    }
  }

  static async searchMessagesInAGroup(req, res) {
    try {
      const { queryTerm, groupId, limit, page } = req.query;
      // check if user is in the group
      if (!queryTerm || !groupId) {
        return res.status(404).json({
          success: false,
          message: "queryTerm and groupId is a required query param",
        });
      }
      const messages = await MessageServices.searchMesagesInAGroup(
        queryTerm,
        groupId,
        limit || 20,
        page || 1
      );
      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "An error occured",
      });
    }
  }
}

module.exports = MessageController;
