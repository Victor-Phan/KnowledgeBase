const {promisifyQuery} = require('./helperFunctions.js');

const getPostTypes = () => {
  const sql = `SELECT * FROM posttype`;
  return promisifyQuery(sql)
}

module.exports = {
  getPostTypes
}