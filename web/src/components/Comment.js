import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./authContext";

const Comment = () => {
    const [comments, setComments] = useState([]);
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

    const handlePost = async (e, newComment) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/comments/`, {
                post_id: postId,
                users_id: currentUser,
                comment: newComment,
            });
            setComments((prevComments) => [response.data, ...prevComments]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="comment">
            <span className="head">Comments</span>
            <CommentInput handlePost={handlePost} />
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

const CommentInput = ({ handlePost }) => {
    const [commentBody, setCommentBody] = useState("");

    const handlePosting = (e) => {
        e.preventDefault(); // Prevent form submission

        handlePost(e, commentBody); // Pass the event and commentBody to the handlePost function
        setCommentBody("");
    };

    return (
        <div>
            <form className="comments" onSubmit={handlePosting}>
                <input
                    type="text"
                    placeholder="Give us your feedback..."
                    className="text"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                />
                <button type="submit" className="button">Comment</button>
            </form>
        </div>
    );
};

export default Comment;
