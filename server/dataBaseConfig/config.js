const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "165.227.156.128",
  user: "said",
  port: 5500,
  password: '$Said123456',
  database: "harmonystore_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { connection };