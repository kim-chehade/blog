import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

    const category = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await axios.get(`/posts${category}`); 
              setPosts(res.data);
            } catch (err) {
              console.log("Axios Error:", err);
              console.log("Response Data:", err.response.data);
            }
          };
        fetchData();
    }, [category]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
      }
      
    return (
        <div className="home">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="image">
                            <img src={`../upload/${post.image}`} alt="Pic here" />
                        </div>
                        <div className="content">
                            <Link to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.description)}</p>
                            <button>
                                <Link className="btn" to={`/post/${post.id}`}>Read More</Link>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Home;