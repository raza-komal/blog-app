import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Home from "../pages/Home";

const TopBar = () => {
  const { currUser, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const catg = useLocation().search;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/posts/${catg}`);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [catg]);
  const links = ["art", "science", "technology", "cinema", "design", "food"];

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="assets/logo.png" alt="Kolam" />
          </Link>
        </div>
        <div className="login__links">
          {!currUser && (
            <Link to="/signup" className="login">
              {" "}
              Login
            </Link>
          )}
          {currUser && (
            <>
              <span>{currUser?.username}</span>
              <span className="logout" onClick={logout}>
                Logout
              </span>
            </>
          )}
        </div>
      </div>
      <div className="links__container">
        <div className="links">
          {links.map((link, index) => (
            <ul key={index}>
              <li>
                <Link to={`/?catg=${link}`}>{link}</Link>
              </li>
            </ul>
          ))}
          <Link className="write" to="/write">
            Write
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
