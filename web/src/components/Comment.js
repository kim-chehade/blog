import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./authContext";
import moment from "moment";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
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
            console.log(postId);
            const response = await axios.post(`/comments/`, {
                post_id: postId,
                users_id: currentUser.id,
                comment: commentBody,
                created: moment(Date.now()).format("YYYY-MM-DD"),
            });
            setComments((prevComments) => [response.data, ...prevComments]);
            setCommentBody("");
            window.location.reload();
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
                    <button onClick={handlePost} className="button">
                        Comment
                    </button>
                </form>
            </div>
            <div className="commentDisplay">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div className="commentsDisplay" key={index}>
                            <div className="displayComment">
                            <span className="username">{comment.username}</span>
                            <span className="date">{moment(comment.created).format("DD-MM-YYYY")}</span>
                            </div>
                            <span>{comment.comment}</span>
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </div>
    );
};

export default Comment;
