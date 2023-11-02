import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Comment from "./Comment";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "./authContext";

const Blog = () => {
  const [post, setPost] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        const postData = res.data;
        postData.description = postData.description.replace(/\n/g, "<br>");
        setPost(postData);
      } catch (err) {
        console.log("Axios Error:", err);
        console.log("Response Data:", err.response.data);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log("Axios Error:", err);
      console.log("Response Data:", err.response.data);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="blog">
      <div className="content">
        {post && (
          <div>
            <img src={`../upload/${post.image}`} alt="" />
            <div className="user">
              <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {currentUser && currentUser.username === post.username && (
                <div className="edit">
                  <Link to={`/create?edit=2`} state={post}>
                    <FontAwesomeIcon
                      className="icon"
                      icon={faPenToSquare}
                      style={{ color: "#43f104" }}
                    />
                  </Link>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faTrashCan}
                    onClick={handleDelete}
                    style={{ color: "#ff0000" }}
                  />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.description }} />

          </div>
        )}
        <Comment/>
      </div>
    </div>
  );
};

export default Blog;
