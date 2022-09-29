import express from "express";

import fetchBooks from "../controllers/books.js" ;

const router = express.Router();


router.get("/", fetchBooks);


export default router