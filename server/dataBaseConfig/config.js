const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // port: 5600,
  password: 'root',
  // "$Said123456"
  database: "harmonystore_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { connection };