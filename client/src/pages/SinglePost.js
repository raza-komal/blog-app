import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import Delete from "../assets/del2.png";
import Edit from "../assets/edit3.png";
import { AuthContext } from "../context/authContext";

const SinglePost = () => {
  const [post, setPost] = useState([]);
  const postId = useLocation().pathname.split("/")[2];
  const { currUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3400/posts/${postId}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    await axios.delete(`/posts/${postId}`);
    navigate("/");
  };
  const getText=(html)=>{
    const doc= new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
   }
  
 
  const handleEdit = () => {};
  return (
    <div className="single">
      <div className="content">
        <img
          src={
            `../assets/${post?.image}` ||
            "https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
          }
          alt="cover"
        />
        <div className="user">
          <img
            src={
              post?.usrimg ||
              "https://images.unsplash.com/photo-1664303167354-6c530671d1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            }
            alt=""
          />
          <div className="info">
            <span>{post?.username}</span>
            <p> posted {moment(post?.date).fromNow()}</p>
          </div>

          {currUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img onClick={handleEdit} src={Edit || " "} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={Delete || ""} alt="delete" />
            </div>
          )}
        </div>

        <div className="post_content">
          <h1>{post?.title}</h1>
          <p>{getText(post?.desc)}</p>
        </div>
      </div>
      <div className="sidemenu">
        <Menu catg={post?.catg}/>
      </div>
    </div>
  );
};

export default SinglePost;
