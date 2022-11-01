let axios = require("axios");

const createMessage = (sender, receiving_group, receiving_user, message) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  let data = JSON.stringify({
    operation: "insert",
    schema: "chati",
    table: "messages",
    records: [
      {
        sender,
        receiving_user,
        receiving_group,
        message,
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

module.exports = createMessage;
