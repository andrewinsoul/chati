const { dbPw, dbUrl } = require("../constants");

class BaseServices {
  static getConfig(data) {
    if (!dbUrl || !dbPw) return null;
    return {
      method: "post",
      url: dbUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${dbPw}`,
      },
      data,
    };
  }
}

module.exports = BaseServices;
