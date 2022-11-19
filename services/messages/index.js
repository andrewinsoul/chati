const axios = require("axios");
const SqlQueries = require("./sql");
const BaseServices = require("../");

class MessageServices extends BaseServices {
  static sendMessage(messageText, receiverId, groupId, senderId) {
    let data = JSON.stringify({
      operation: "insert",
      schema: "chati",
      table: "messages",
      records: [
        {
          text: messageText,
          receiver_id: receiverId,
          group_id: groupId,
          sender_id: senderId,
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
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static fetchMessagesBtwnUsers(senderId, clientId, limit, page) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_MSGS_BTWN_2_USERS(senderId, clientId, limit, page),
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

  static fetchMessagesInAGroup(groupId, limit, page) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.GET_MSGS_IN_A_GROUP(groupId, limit, page),
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

  static searchMesageBetweenUsers(
    queryTerm,
    senderId,
    receiverId,
    limit,
    page
  ) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.SEARCH_MESSAGES_BTWN_USERS(
        queryTerm,
        senderId,
        receiverId,
        limit,
        page
      ),
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

  static searchMesagesInAGroup(queryTerm, groupId, limit, page) {
    let data = JSON.stringify({
      operation: "sql",
      sql: SqlQueries.SEARCH_MESSAGES_IN_A_GROUP(
        queryTerm,
        groupId,
        limit,
        page
      ),
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
}

module.exports = {
  MessageServices,
};
