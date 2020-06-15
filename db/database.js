const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: process.env.mysql_connection_pool_limit || 10, // default:10
  host: process.env.mysql_host || 'localhost',
  user: process.env.mysql_user || 'root',
  password: process.env.mysql_password || 'password',
  database: process.env.mysql_database || 'c4711_FinalProject',
});

module.exports = pool.promise();
