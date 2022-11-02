const dbUrl = process.env.HARPERDB_URL;
const dbPw = process.env.HARPERDB_PW;
const clientConnections = {};

module.exports = {
  dbUrl,
  dbPw,
  clientConnections,
};
