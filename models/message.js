const { promisifyQuery } = require('./helperFunctions.js');

const insertMessage = ({ sender_id, recipient_id, subject, message }) => {
  const sql = `INSERT INTO message (sender_id, recipient_id, subject, message) 
               VALUES ('${sender_id}', '${recipient_id}', '${subject}', '${message}')`;
  return promisifyQuery(sql);
};

const getFirstMessageForUser = (id) => {
  const sql = `SELECT id
    FROM message 
    WHERE recipient_id = ${id} OR sender_id = ${id}
    ORDER BY message.timestamp DESC
    LIMIT 1`;
  return promisifyQuery(sql);
};

const getAllMessagesForUser = (id) => {
  const sql = `SELECT message.*, first_name, last_name, image_url, DATE_FORMAT(message.timestamp, "%Y-%m-%d") as date, DATE_FORMAT(message.timestamp, "%r") as timestamp
    FROM message 
    LEFT JOIN (
        SELECT first_name, last_name, id, image_url
        FROM USER
    ) user
    ON user.id = message.sender_id
    WHERE recipient_id = "${id}" OR sender_id = "${id}"
    ORDER BY message.timestamp DESC`;
  return promisifyQuery(sql);
};

const getMessage = (message_id) => {
  const sql = `SELECT message.*, first_name, last_name, image_url, DATE_FORMAT(message.timestamp, "%Y-%m-%d") as date, DATE_FORMAT(message.timestamp, "%r") as timestamp
    FROM message 
    LEFT JOIN (
        SELECT first_name, last_name, id, image_url
        FROM USER
    ) user
    ON user.id = message.sender_id
    WHERE message.id = "${message_id}"`;
  return promisifyQuery(sql);
};

const getMessageForConversation = ({ requestingUserID, requestedUserID }) => {
  const sql = `SELECT 
                recipient.id AS 'recipient_id',
                recipient.first_name AS 'recipient_first_name',
                recipient.last_name AS 'recipient_last_name',
                recipient.image_url AS 'recipient_image_url',
                sender.id AS 'sender_id',
                sender.first_name AS 'sender_first_name',
                sender.last_name AS 'sender_last_name',
                sender.image_url AS 'sender_image_url',
                message.subject AS 'subject', 
                message.message AS 'message', 
                message.timestamp AS 'timestamp'
            FROM message message
            INNER JOIN user recipient ON
                message.recipient_id = recipient.id
            INNER JOIN user sender ON
                message.sender_id = sender.id
            WHERE 
                (message.recipient_id = '${requestingUserID}' AND message.sender_id = '${requestedUserID}') OR
                (message.recipient_id = '${requestedUserID}' AND message.sender_id = '${requestingUserID}')
            ORDER BY message.timestamp DESC`;
  return promisifyQuery(sql);
}

module.exports = {
  insertMessage,
  getAllMessagesForUser,
  getFirstMessageForUser,
  getMessage,
  getMessageForConversation,
};
