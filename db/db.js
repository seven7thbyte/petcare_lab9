const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

if(db.connect){
  console.log("MYSQL Connected");
}
else{
  console.log("Error not connected to MYSQL");
}

module.exports = db;
