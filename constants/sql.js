const SQL_QUERIES = {
  GET_USERS_IN_A_GROUP: (groupId) => `
    SELECT users.user_id, users.email, users.phone, 
    users.username,
    users.server_res_object,
    user_groups.group_id FROM chati.user_groups JOIN 
    chati.users ON users.user_id = user_groups.user_id 
    WHERE group_id='${groupId}'
    `,

  GET_MSGS_BTWN_2_USERS: (userId1, userId2) => `
    SELECT * FROM messages WHERE 
    (sender='${userId1}' AND receiving_user='${userId2}') OR
    (receiving_user='${userId1}' AND sender='${userId2}')
    `,

  GET_MSGS_IN_A_GROUP: (groupId) => `
    SELECT * FROM messages WHERE 
    group_id='${groupId}'
    `,

  GET_A_USER: (
    email,
    username,
    phone
  ) => `SELECT * FROM chati.users WHERE email = '${email}' OR 
    username = '${username}' OR phone = '${phone}'
    `,
  GET_A_GROUP: (name) => `SELECT * FROM chati.groups WHERE name = '${name}'`,
  DROP_USER_CONN: userId => `DELETE FROM chati.user_conns WHERE userId = '${userId}'`,
};

module.exports = SQL_QUERIES;
