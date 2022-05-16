const sql = require("mysql2");
const dotenv = require("dotenv").config();

// const db = sql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB,
// });

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "prabesh",
  database: "sql_login",
});

module.exports = db;
