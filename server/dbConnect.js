import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: "admin",
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err, res) => {
  if (err) throw err;
  console.log("Db Connected");
});


export default db;