import db from "../dbConnect.js";
import jwt from "jsonwebtoken";

export const createPost = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwttest", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const que =
      "INSERT INTO posts (`title`, `desc`,`image`,`catg`,`date`, `uid`) VALUES (?) ";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.image,
      req.body.catg,
      req.body.date,
      userInfo.id,
    ];
    db.query(que, [values], (err, result) => {
      if (err) console.log(err);
      if (!result) return res.status(403).json(result);
      return res.status(201).json(result);
    });
  });
};

export const fetchPosts = (req, res) => {
  // Check if there is categoryin query or not then select posts from table

  const que = req.query.catg
    ? "SELECT *FROM posts WHERE catg = ? "
    : "SELECT * FROM posts";

  db.query(que, [req.query.catg], (err, result) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(result);
  });
};

export const fetchPost = (req, res) => {
  const que =
    "SELECT  `username`, `title`,`desc`,`image`,p.id,`catg`,`date`,`usrimg` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(que, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(result[0]);
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwttest", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const que =
      "UPDATE posts SET `title`= ?, `desc` = ?,`image` =?,`catg`=? WHERE `id` = ? AND `uid`=? ";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.image,
      req.body.catg,
    ];
    db.query(que, [...values, postId, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err);
      // if (!result) return res.status(403).json("Something went wrong!");
      return res.status(201).json(result);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("You are not authenticated");

  jwt.verify(token, "jwttest", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};
