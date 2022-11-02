const SQL_QUERY_MESSAGES = {
  GET_MSGS_BTWN_2_USERS: (userId1, userId2, limit, page) => {
    const offset = limit * (page - 1);

    return `
      SELECT * FROM chati.messages WHERE 
      (sender_id='${userId1}' AND receiver_id='${userId2}') OR
      (receiver_id='${userId1}' AND sender_id='${userId2}')
      ORDER BY __createdtime__ DESC LIMIT ${limit} OFFSET ${offset}
      `;
  },

  GET_MSGS_IN_A_GROUP: (groupId, limit, page) => {
    const offset = limit * (page - 1);
    return `
      SELECT * FROM chati.messages WHERE 
      group_id='${groupId}' ORDER BY __createdtime__ DESC LIMIT ${limit} OFFSET ${offset}
    `;
  },

  SEARCH_MESSAGES_BTWN_USERS: (searchTerm, userId1, userId2, limit, page) => {
    const offset = limit * (page - 1);
    return `
    SELECT * FROM chati.messages WHERE 
    text ILIKE '%${searchTerm}%' AND (
      (sender_id='${userId1}' AND receiver_id='${userId2}') OR
      (receiver_id='${userId1}' AND sender_id='${userId2}')
    ) ORDER BY __createdtime__ DESC LIMIT ${limit} OFFSET ${offset}
    `;
  },

  SEARCH_MESSAGES_IN_A_GROUP: (searchTerm, groupId, limit, page) => {
    const offset = limit * (page - 1);
    return `
    SELECT * FROM chati.messages WHERE 
    text ILIKE '%${searchTerm}%' AND group_id='${groupId}' 
    ORDER BY __createdtime__ DESC LIMIT ${limit} OFFSET ${offset}
    `;
  },
};

module.exports = SQL_QUERY_MESSAGES;
