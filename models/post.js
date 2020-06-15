const { promisifyQuery } = require('./helperFunctions.js');

const baseSQL = `SELECT post.id, subject, type_id, message, user.id AS user_id, user.first_name, user.last_name, user.image_url, IFNULL(replies, 0) AS replies, DATE_FORMAT(post.timestamp, "%Y/%m/%d") as timestamp, posttype.type
FROM post 
LEFT JOIN (
SELECT id, first_name, last_name, image_url 
FROM user 
) user
ON post.user_id = user.id 
LEFT JOIN (
SELECT post_id, COUNT(*) AS replies
FROM postcomment
GROUP BY post_id
) postcomment
ON post.id = postcomment.post_id
LEFT JOIN (
  SELECT *
  FROM posttype
) posttype
ON posttype.id = type_id`;

const insertPost = ({ user_id, type, subject, message }) => {
  const sql = `INSERT INTO post (user_id, type_id, subject, message) 
               VALUES ("${user_id}", "${type}", "${subject}", "${message}")`;
  return promisifyQuery(sql);
};

const getOnePost = (id) => {
  const sql = `SELECT * FROM post WHERE id = '${id}'`;
  return promisifyQuery(sql);
};

const getAllPosts = () => {
  const sql = `SELECT * FROM post`;
  return promisifyQuery(sql);
}

const getAllPostsDESC = () => {
  const sql = `${baseSQL} ORDER BY post.timestamp DESC`;
  return promisifyQuery(sql);
}

const getAllPostsByUser = (user_id) => {
  const sql = `${baseSQL} WHERE user_id = '${user_id}'`;
  return promisifyQuery(sql);
}

const getPostsByType = (type_id) => {
  const sql = `${baseSQL} WHERE post.type_id = '${type_id}'`;
  return promisifyQuery(sql);
}

const getPostsByTypeDESC = (type_id) => {
  const sql = `${baseSQL} WHERE type_id = '${type_id}' ORDER BY post.timestamp DESC`;
  return promisifyQuery(sql);
}

const getPostsBySubject = (filter) => {
  const sql = `${baseSQL} WHERE subject LIKE '%${filter}%'`;
  return promisifyQuery(sql);
}

const getPostWithAllProperties = (post_id) => {
  const sql = `${baseSQL} WHERE post.id = ${post_id}`;
  return promisifyQuery(sql);
}

module.exports = {
  insertPost,
  getOnePost,
  getAllPosts,
  getAllPostsDESC,
  getAllPostsByUser,
  getPostsByType,
  getPostsByTypeDESC,
  getPostsBySubject,
  getPostWithAllProperties,
};
