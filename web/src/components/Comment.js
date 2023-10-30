import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./authContext";
import moment from "moment";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState(""); // State for the new comment
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/comments?post_id=${postId}`);
                setComments(res.data);
            } catch (err) {
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response.data);
            }
        };
        fetchData();
    }, [postId]);

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            console.log(postId)
            const response = await axios.post(`/comments/`, {
                post_id: postId,
                users_id: currentUser,
                comment: commentBody,
                created: moment(Date.now()).format("YYYY-MM-DD"),
            });
            setComments((prevComments) => [response.data, ...prevComments]);
            setCommentBody(""); 
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="comment">
            <span className="head">Comments</span>
            <div>
                <form className="comments">
                    <input
                        type="text"
                        placeholder="Give us your feedback..."
                        className="text"
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                    <button onClick={handlePost} className="button">Comment</button>
                </form>
            </div>
            <div className="commentDisplay">
                {comments.map((comment) => (
                    <div className="comments" key={comment.id}>
                        <span className="username">{comment.username}</span>
                        <span>{comment.comment}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
