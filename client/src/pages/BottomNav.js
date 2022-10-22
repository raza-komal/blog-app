import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./Home";

const BottomNav = () => {
  const [posts, setPosts] = useState([]);
  const catg = useLocation().search;
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3400/posts/${catg}`);
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
    <div className="bottom">
      <div className="links__container">
        <div className="links">
          {links.map((link, index) => (
            <>
              <ul key={index}>
                <li>
                  <Link to={`/?catg=${link}`}>{link}</Link>
                </li>
              </ul>
            </>
          ))}
          <Link className="write" to="/write">
            Write
          </Link>
        </div>
      </div>
      <div className="homeContainer">
        <Home posts={posts}/>
      </div>
    </div>
  );
};

export default BottomNav;
