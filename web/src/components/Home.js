import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [originalPosts, setOriginalPosts] = useState([]); // Store the original posts
    const [displayedPosts, setDisplayedPosts] = useState([]); // Store the posts to display
    const [searchQuery, setSearchQuery] = useState('');
    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${category}`);
                const data = res.data;
                setOriginalPosts(data); // Store the original posts
                setDisplayedPosts(data); // Set the displayed posts initially
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

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchButtonClick = () => {
        const filteredPosts = originalPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setDisplayedPosts(filteredPosts); // Update the displayed posts
    }

    return (
        <div className="home">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button className="search-button" onClick={handleSearchButtonClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="posts">
                {displayedPosts.map(post => (
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
