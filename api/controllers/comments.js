import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
    const post_id = req.query.post_id;
    const query = post_id
      ? 'SELECT * FROM comments WHERE post_id = ?'
      : 'SELECT * FROM comments';
  
    db.query(query, [post_id], (err, data) => {
      if (err) {
        console.error("Error while fetching comments:", err);
        return res.status(500).json(err);
      } else {
        return res.status(200).json(data);
      }
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not auth.");

    jwt.verify(token, "your_secret_key_here", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const query =
            "INSERT INTO comments(`post_id`, `users_id`, `comment`, `created`) VALUES (?)";

        const values = [
            req.body.post_id,
            userInfo.id,
            req.body.comment,
            req.body.created
        ];

        db.query(query, values, (err, data) => {
            if (err) {
                console.error("Error while inserting a comment:", err);
                return res.status(500).json(err);
            }
            return res.status(200).json({ message: "Comment has been posted." });
        });
    });
};
