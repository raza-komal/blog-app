import db from "../dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = (req, res) => {
  const que = "SELECT * FROM users WHERE email = ? ";

  db.query(que, [req.body.email], (err, result) => {
    if (err) return res.json(err);
    if (result?.length === 0) return res.status(404).json("User not Found");

    // Check password
    // console.log("Result founed", result);
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!isPasswordMatch) return res.status(400).json("Wrong Credentials");

    // Sign a user
    const token = jwt.sign(
      { id: result[0].id, email: result[0].email },
      "jwttest"
    ); //add secret key
    const { password, ...other } = result[0];

    /*   res.cookie("accessToken", `${token}`, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    }).status(200).json({accessToken:token}); */

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json(other);

    console.log("Signin", req.cookies["token"]);
  });
};

export const signup = (req, res) => {
  const que = "SELECT * FROM users WHERE email = ? OR username = ? ";

  db.query(que, [req.body.email, req.body.username], (err, result) => {
    if (err) return res.json(err);
    console.log(result);

    if (result?.length) return res.status(409).json("User already registered");

    //   Hash password from plain text to encrypted
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertUser =
      "INSERT INTO users (username,email,password) VALUES (?) ";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertUser, [values], (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json("Signed up successfully");
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json("User has been logged out.");
};
