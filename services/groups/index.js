const axios = require('axios');
const SqlQueries = require('../../constants/sql');


const createGroup = (name, group_pic, description) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: 'insert',
    schema: 'chati',
    table: 'groups',
    records: [
      {
        name,
        group_pic,
        description,
      },
    ],
  });

  let config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${dbPw}`,
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
        const response = await axios(config)
        resolve(JSON.stringify(response.data));

    } catch (error) {
        reject(error);
    }
  });
}

const confirmGroupIsUnique = (name) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "sql",
    sql: SqlQueries.GET_A_GROUP(name),
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

const addUserToGroup = (userId, groupId) => {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;
  
    let data = JSON.stringify({
      operation: 'insert',
      schema: 'chati',
      table: 'user_groups',
      records: [
        {
          user_id: userId,
          group_id: groupId,
        },
      ],
    });
  
    let config = {
      method: 'post',
      url: dbUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${dbPw}`,
      },
      data: data,
    };
  
    return new Promise(async (resolve, reject) => {
      try {
          const response = await axios(config)
          resolve(JSON.stringify(response.data));
  
      } catch (error) {
          reject(error);
      }
    });
  }

module.exports = {createGroup, addUserToGroup, confirmGroupIsUnique};
