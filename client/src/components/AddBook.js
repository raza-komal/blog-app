import axios from "axios";
import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    price: "",
    author: "",
    cover_page: "",
  });

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})  
      console.log(formData) 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3400/books", formData)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter Book Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="subTitle"
          value={formData.subTitle}
          placeholder="Enter Book subTitle"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          placeholder="Enter Book Author name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Set book Price"
          onChange={handleChange}
        />
        <input
          type="media"
          name="cover_page"
          value={formData.cover_page}
          placeholder="Add cover page"
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
