const { promisifyQuery } = require('./helperFunctions.js');

const insertLike = ({ user_profile_liked, user_liked_profile }) => {
  const sql = `INSERT INTO profilelike (user_profile_liked, user_liked_profile) 
               VALUES ('${user_profile_liked}', '${user_liked_profile}')`;
  return promisifyQuery(sql);
};

const removeLike = ({ user_profile_liked, user_liked_profile }) => {
  const sql = `DELETE FROM profilelike WHERE user_profile_liked = '${user_profile_liked}' AND user_liked_profile = '${user_liked_profile}'`;
  return promisifyQuery(sql);
};

const countLikes = (userID) => {
  const sql = `SELECT COUNT(*) AS count FROM profilelike WHERE user_profile_liked = '${userID}'`;
  return promisifyQuery(sql);
};

const getUsersLiked = (userID) => {
  const sql = `SELECT * FROM profilelike WHERE user_liked_profile = '${userID}'`;
  return promisifyQuery(sql);
};

const hasUserLiked = (userID, otherUserID) => {
  const sql = `SELECT COUNT(*) AS count FROM profilelike WHERE user_profile_liked = '${otherUserID}' AND user_liked_profile = '${userID}'`;
  return promisifyQuery(sql);
};

module.exports = {
  hasUserLiked,
  insertLike,
  removeLike,
  countLikes,
  getUsersLiked,
};
