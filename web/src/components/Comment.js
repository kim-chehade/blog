import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
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
                created: moment(Date.now()).format("DD-MM-YYYY"),
            });

            // Add the newly posted comment to the state
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
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

const CommentItem = ({ comment }) => {
    const [isReplying, setisReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handlePost = async () => {
        try {
            const response = await axios.post(`./comments/`, {
                post_id: comment.post_id,
                users_id: comment.users_id,
                comment: replyText,
                created: moment(Date.now()).format("DD-MM-YYYY"),
            });

            // You can add the newly posted comment to the state, but no nesting
            // setComments((prev) => [response.data, ...prev]);

            // Clear the reply text
            setReplyText("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="comments" key={comment.id}>
            <span>{comment.username}</span>
            <span>{comment.comment}</span>
            {isReplying ? (
                <div>
                    <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button className="button" onClick={handlePost}>
                        Post Reply
                    </button>
                </div>
            ) : (
                <button className="button" onClick={() => setisReplying(true)}>
                    Reply
                </button>
            )}
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
