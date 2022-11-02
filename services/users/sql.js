const SQL_QUERY_USERS = {
  GET_USERS_IN_A_GROUP: (groupId) => `
      SELECT users.user_id, users.email, users.phone, 
      users.username,
      user_groups.group_id FROM chati.user_groups JOIN 
      chati.users ON users.user_id = user_groups.user_id 
      WHERE group_id='${groupId}'
      `,

  GET_A_USER: (
    email,
    username,
    phone
  ) => `SELECT * FROM chati.users WHERE email = '${email}' OR 
      username = '${username}' OR phone = '${phone}'
      `,
  CHECK_A_USER_CREDENTIALS: (
    identity,
    password
  ) => `SELECT * FROM chati.users WHERE (
        email = '${identity}' OR username = '${identity}' 
        OR phone = '${identity}') AND password='${password}'
      `,
  GET_A_GROUP: (name) => `SELECT * FROM chati.groups WHERE name = '${name}'`,
  GET_USER_CONN: (userId) =>
    `SELECT server_res_object FROM chati.user_conns WHERE user_id = '${userId}'`,
  DROP_USER_CONN: (userId) =>
    `DELETE FROM chati.user_conns WHERE user_id = '${userId}'`,
};

module.exports = SQL_QUERY_USERS;
