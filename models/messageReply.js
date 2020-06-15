const { promisifyQuery } = require('./helperFunctions.js');

const getAllMessageReplies = (message_id) => {
  const sql = `SELECT messageReply.*, first_name, last_name, image_url, DATE_FORMAT(messageReply.timestamp, "%Y-%m-%d") as date, DATE_FORMAT(messageReply.timestamp, "%r") as timestamp
  FROM messageReply 
  LEFT JOIN (
    SELECT first_name, last_name, image_url, id
    FROM user
  ) user
  ON user.id = messageReply.user_id
  WHERE message_id = "${message_id}"`;
  return promisifyQuery(sql);
};

const insertMessageReply = ({ user_id, message_id, reply }) => {
  const sql = `INSERT INTO messageReply (user_id, message_id, reply) 
               VALUES ("${user_id}", "${message_id}", "${reply}")`;
  return promisifyQuery(sql);
};

module.exports = {
  getAllMessageReplies,
  insertMessageReply,
};
