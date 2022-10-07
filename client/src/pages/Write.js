import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
const Write = () => {
  const state = useLocation().state;
  console.log(state);
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [catg, setCatg] = useState(state?.catg || "");
  /*   const [post, setPost] = useState({
    title: "",
    desc:"",
    file: "",
    catg:""
  });
  const { title, desc, file, catg } = post; */
  const links = ["art", "science", "technology", "cinema", "design", "food"];
  const navigate = useNavigate();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log("file", imgUrl);
    try {
      state
        ? await axios.put(`/posts/${state?.id}`, {
            title,
            desc: value,
            catg,
            image: file ? imgUrl : null,
          })
        : await axios.post("/posts", {
            title,
            desc: value,
            catg,
            image: file ? imgUrl : " ",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDraft = () => {};

  return (
    <div className="write__post">
      <div className="content">
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor">
          <ReactQuill
            className="editor__text"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibilty: </b> Public
          </span>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload file
          </label>
          <div className="buttons">
            <button onClick={handleDraft}>Save as Draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {links.map((link) => (
            <div className="cat">
              {" "}
              <input
                type="radio"
                name="catg"
                value={link}
                checked={catg === `${link}`}
                id={`${link}`}
                onChange={(e) => setCatg(e.target.value)}
              />
              <label htmlFor={`${link}`}>{link}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
