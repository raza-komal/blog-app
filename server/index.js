import express from "express";
import cors from 'cors';
import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = process.env.PORT;
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
const sqlFetch =
  "SELECT * FROM books";

app.get("/books", (req, res) => {
  db.query(sqlFetch, (err, result) => {
    if (err) console.log("error", err.message);
    res.json(result);
  });

//  db.end();
});





app.use(express.json())
app.use(cors())
const sqlInsert  = "INSERT INTO books (title,subTitle,author,price,cover_page) VALUES (?)";

app.post("/books", (req,res) => {
  const values = [req.body.title,req.body.subTitle, req.body.author,req.body.price,req.body.cover_page];
  db.query(sqlInsert,[values] ,(err, result) => {
    if (err) console.log("error", err.message);
    res.json(result);
  });
//  db.end()
})



app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});


