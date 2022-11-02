const SQL_QUERY_MESSAGES = {
  GET_A_GROUP_BY_NAME: (groupName) => {
    return `SELECT * FROM chati.groups WHERE name='${groupName}'`;
  },

  GET_ALL_GROUPS_OF_A_USER: (userId) => {
    return `SELECT * FROM chati.user_groups AS ug JOIN chati.groups AS g
    ON ug.group_id = g.group_id WHERE ug.user_id = '${userId}'
    `;
  },

  GET_A_GROUP_BY_ID: (groupId) => {
    return `SELECT * FROM chati.groups WHERE group_id='${groupId}'`;
  },
};

module.exports = SQL_QUERY_MESSAGES;
