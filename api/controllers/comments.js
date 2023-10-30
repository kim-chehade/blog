import { db } from "../db.js";

export const getComments = (req, res) => {
  const post_id = req.query.post_id;
  const query = 'SELECT u.username, c.comment, c.created FROM comments c INNER JOIN users u ON u.id = c.users_id WHERE c.post_id = ?';

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

};
