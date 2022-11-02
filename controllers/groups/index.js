const { GroupServices } = require("../../services/groups");

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
      if (group.length) {
        return res.status(409).json({
          success: false,
          message: "group with that name already exists",
        });
      }
      return res.status(201).json({
        success: false,
        message: "Group successfully created",
        data: group,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async fetchAllGroupsOfAUser(req, res) {
    try {
      const groups = GroupServices.fetchAllGroupsOfAUser(req.key);
      return res.status(200).json({ success: true, groups });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error.message || "An error occurred" });
    }
  }

  static async userJoinGroup(req, res) {
    try {
      if (!req.query.groupId) {
        return res.status(422).json({
          success: false,
          message: "The groupId query param is required",
        });
      }

      await GroupServices.addUserToGroup(req.key, req.query.groupId);
      return res
        .status(200)
        .json({ success: true, message: "user successfully added to group" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error.message || "An error occured" });
    }
  }
}

module.exports = GroupController;
