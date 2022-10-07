import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const catg = useLocation().search;
  console.log(catg);
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3400/posts/${catg}`);
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [catg]);
 const getText=(html)=>{
  const doc= new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
 }

  return (
    <div className="home">
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post?.id}>
            <div className="img">
              <img src={`../assets/${post?.image}`} alt="cover" />
            </div>
            <div className="content">
              <Link to={`/posts/${post?.id}`}>
                <h1>{post?.title}</h1>
              </Link>
              <p>{getText(post?.desc )}</p>
              <Link to={`/posts/${post?.id}`}>Read more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
