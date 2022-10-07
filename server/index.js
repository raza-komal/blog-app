import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./dbConnect.js";
import authRoutes from "./route/auth.js";
import postRoutes from "./route/posts.js";
import cookieParser from "cookie-parser";

import multer from "multer";

dotenv.config();

const app = express();
const port = process.env.PORT;

const sqlFetch = "SELECT * FROM books";

/*  app.get("/books", (req, res) => {
  db.query(sqlFetch, (err, result) => {
    if (err) console.log("error", err.message);
    res.json(result);
  });

//  db.end();
}); */

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/users", authRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
