const axios = require("axios");
const SqlQueries = require("./sql");
const BaseServices = require("../");

class GroupServices extends BaseServices {
  static createGroup(name, group_pic, description) {
    let data = JSON.stringify({
      operation: "insert",
      schema: "chati",
      table: "groups",
      records: [
        {
          name,
          group_pic,
          description,
        },
      ],
    });

    let config = this.getConfig(data);
    if (!config) {
      throw {
        success: false,
        message: "invalid harperDb credentials",
      };
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(config);
        resolve(JSON.stringify(response.data));
      } catch (error) {
        reject(error);
      }
    });
  }

  static confirmGroupIsUnique(name) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_A_GROUP_BY_NAME(name),
    });

    let config = this.getConfig(data);
    if (!config) {
      throw {
        success: false,
        message: "invalid harperDb credentials",
      };
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static fetchAllGroupsOfAUser(userId) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_ALL_GROUPS_OF_A_USER(userId),
    });

    let config = this.getConfig(data);
    if (!config) {
      throw {
        success: false,
        message: "invalid harperDb credentials",
      };
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static addUserToGroup(userId, groupId) {
    let data = JSON.stringify({
      operation: "insert",
      schema: "chati",
      table: "user_groups",
      records: [
        {
          user_id: userId,
          group_id: groupId,
        },
      ],
    });
    let config = this.getConfig(data);
    if (!config) {
      throw {
        success: false,
        message: "invalid harperDb credentials",
      };
    }
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(config);
        resolve(JSON.stringify(response.data));
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = { GroupServices };
