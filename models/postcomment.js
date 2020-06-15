const { promisifyQuery } = require('./helperFunctions.js');

const insertPostComment = ({ post_id, user_id, comment }) => {
  const sql = `INSERT INTO postcomment (post_id, user_id, comment) 
               VALUES ('${post_id}', '${user_id}', '${comment}')`;
  return promisifyQuery(sql);
};

const getPostComments = (post_id) => {
  const sql = `SELECT postcomment.id, post_id, user_id, comment, timestamp, image_url
    FROM postcomment 
    LEFT JOIN (
    SELECT id, image_url
    FROM user
    ) user
    ON postcomment.user_id = user.id
    WHERE post_id = ${post_id} ORDER BY timestamp ASC`;
  return promisifyQuery(sql);
};

const getNumberComments = (post_id) => {
  const sql = `SELECT COUNT(id) AS count FROM postcomment WHERE post_id = '${post_id}'`;
  return promisifyQuery(sql);
};

module.exports = {
  insertPostComment,
  getPostComments,
  getNumberComments,
};
