import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ catg }) => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/?catg=${catg}`);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [catg]);

  return (
    <div className="menu">
      <h1>Recommended Blogs</h1>

      {posts.map((post) => (
        <div class="post" key={post.id}>
          <img src={ post?.image ?  `../assets/${post?.image}`: post?.image} alt="cover" />
          <h2>{post?.title}</h2>
          <button><Link to={`/posts/${post?.id}`}>Read More</Link></button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
