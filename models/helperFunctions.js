const { db } = require('../db');

const promisifyQuery = (sql) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, (err, data, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  promisifyQuery,
};
