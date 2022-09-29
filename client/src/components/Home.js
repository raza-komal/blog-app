import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import cover from "../assets/cover.jpg"
import { Link } from "react-router-dom";
const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3400/books");
        const myData = response.data;
        setBooks(myData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div>
      <div class="books_container">
      {books.map((book) => (
        <div>
          <div>
            <img src={cover} alt="Cover" style={{height: "190px", width:"130px"}}/>
          </div>
          <h1>{book.title}</h1>
          <p>{book.subTitle}</p>
          <h6>Author: {book.author}</h6>
          <h3>Price: ${book.price}</h3>
        </div>
      ))}
      </div>
      <button><Link to="/new">Add New Book</Link></button>
    </div>
  );
};

export default Home;
