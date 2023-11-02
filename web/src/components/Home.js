import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [originalPosts, setOriginalPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${category}`);
                const data = res.data;
                setOriginalPosts(data);
                setDisplayedPosts(data);
            } catch (err) {
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response.data);
            }
        };
        fetchData();
    }, [category]);

    const getShortenedText = (html, maxLength) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const text = doc.body.textContent;
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchButtonClick = () => {
        const filteredPosts = originalPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setDisplayedPosts(filteredPosts);
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
                            <p>{getShortenedText(post.description, post.description.length / 4)}</p>
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
