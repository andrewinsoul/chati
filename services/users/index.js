let axios = require("axios");
let SqlQueries = require("../../constants/sql");

const createUser = (email, username, phone, password, avatar) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

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

  let config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(JSON.stringify(response.data));
    } catch (error) {
      reject(error);
    }
  });
};

const confirmUserIsUnique = (email, username, phone) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "sql",
    sql: SqlQueries.GET_A_USER(email, username, phone),
  });

  let config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(JSON.stringify(response.data));
    } catch (error) {
      reject(error);
    }
  });
};

const fetchUsersFromGroup = (groupId) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "sql",
    sql: SqlQueries.GET_USERS_IN_A_GROUP(groupId),
  });

  let config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(JSON.stringify(response.data));
    } catch (error) {
      reject(error);
    }
  });
};

const createUserConn = (userId, userConn) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "insert",
    schema: "chati",
    table: "user_conns",
    records: [
      {
        user_id: userId,
        server_res_object: userConn,
      },
    ],
  });

  let config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(JSON.stringify(response.data));
    } catch (error) {
      console.log('OPP LL >>>> ', error);
      reject(error);
    }
  });
};

const dropUserConn = (userId) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "sql",
    sql: SqlQueries.DROP_USER_CONN(userId),
  });

  let config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(JSON.stringify(response.data));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  confirmUserIsUnique,
  fetchUsersFromGroup,
  createUserConn,
  dropUserConn,
};
