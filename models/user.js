const { promisifyQuery } = require('./helperFunctions.js');

const baseSQL = `SELECT id, first_name, last_name, email, image_url, about, country, 
                        DATE_FORMAT(dob, "%Y-%m-%d") as dob,
                        IFNULL(profilelike.count,0) as profileLikes,
                        IFNULL(message.count,0) as messageCount,
                        IFNULL(post.count,0) as postCount
                        FROM user 
                        LEFT JOIN (
                          SELECT COUNT(*) AS count, user_profile_liked
                          FROM profilelike
                          GROUP BY user_profile_liked
                        ) profilelike
                        ON user.id = profilelike.user_profile_liked
				                LEFT JOIN (
                          SELECT COUNT(*) AS count, recipient_id
                          FROM message
                          GROUP BY recipient_id
                          ) message
                          ON user.id = message.recipient_id
				                LEFT JOIN (
                          SELECT COUNT(*) AS count, user_id
                          FROM post
                          GROUP BY post.user_id
                        ) post
                        ON user.id = post.user_id`;

const insertUser = (e) => {
  const {
    first_name,
    last_name,
    email,
    password,
    image_url,
    about,
    country,
    dob,
  } = e;
  const sql = `INSERT INTO user (first_name, last_name, email, password, image_url, about, country, dob) 
               VALUES ("${first_name}", "${last_name}", "${email}", "${password}", "${image_url}", "${about}", "${country}", "${dob}")`;
  return promisifyQuery(sql);
};

const updateUser = (e) => {
  //Cannot update password or email,
  const { id, first_name, last_name, image_url, about, country, dob } = e;
  const sql = `UPDATE user SET first_name = "${first_name}", 
                                last_name = "${last_name}", 
                                image_url = "${image_url}", 
                                about = "${about}", 
                                country = "${country}", 
                                dob = "${dob}" 
                                WHERE (id = "${id}")`;
  return promisifyQuery(sql);
};

const getUser = (id) => {
  const sql = `SELECT * FROM user WHERE id = ${id}`;
  return promisifyQuery(sql);
};

const getUserDetails = (id) => {
  const sql = `${baseSQL} WHERE id = '${id}'`;
  return promisifyQuery(sql);
};

const getAllUsersDetail = () => {
  const sql = baseSQL;
  return promisifyQuery(sql);
};

const getUserByEmail = (email) => {
  const sql = `SELECT * FROM user where email = '${email}'`;
  return promisifyQuery(sql);
};

module.exports = {
  insertUser,
  updateUser,
  getUser,
  getUserByEmail,
  getUserDetails,
  getAllUsersDetail,
};
