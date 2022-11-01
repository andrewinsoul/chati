const groupServices = require("../../services/groups");

class GroupController {
  static async createGroup(req, res) {
    try {
      if (!req.body.name) {
        res
          .status(422)
          .json({ success: false, error: "name of group is required" });
      }
      if (!req.body.description) {
        res
          .status(422)
          .json({ success: false, error: "description of group is required" });
      }
      const group = await groupServices.confirmGroupIsUnique(req.body.name);
      if (JSON.parse(group).length) {
        return res.status(409).json({
          success: false,
          message: "user already exists",
        });
      }
      console.log("THE GROUP IS >>>>> ", group);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async fetchUsersFromGroup(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = GroupController;
