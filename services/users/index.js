const axios = require("axios");
const SqlQueries = require("./sql");
const BaseServices = require("../");

class UserServices extends BaseServices {
  static createUser(email, username, phone, password, avatar) {
    let data = JSON.stringify({
      operation: "insert",
      schema: "chati",
      table: "users",
      records: [
        {
          email,
          username,
          phone,
          avatar,
          password,
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

  static confirmUserIsUnique(email, username, phone) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_A_USER(email, username, phone),
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

  static fetchUsersFromGroup(groupId) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_USERS_IN_A_GROUP(groupId),
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

  static loginUser(identity, password) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.CHECK_A_USER_CREDENTIALS(identity, password),
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

module.exports = {
  UserServices,
};
