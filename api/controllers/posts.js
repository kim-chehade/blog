import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const getPost = (req, res) => {
    const query = "SELECT p.id, `username`,`description`, `title`, p.image, `date`, `category` FROM users u JOIN posts p ON u.id=p.user_id WHERE p.id = ?";

    db.query(query, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            if (data.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json(data[0]);
        }
    });
};

    export const getPosts = (req, res) => {
        const category = req.query.category;
        const query = category
            ? "SELECT * FROM posts WHERE category = ?"
            : "SELECT * FROM posts";

        db.query(query, [category], (err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).json(data);
            }
        });
    };




export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not auth.");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const query =
        "INSERT INTO posts(`title`, `description`, `image`, `date`,`user_id`,`category`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.description,
        req.body.image,
        req.body.date,
        userInfo.id,
        req.body.category,
      ];
  
      db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });
  };





export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token, "jwtkey", (verifyErr, userInfo) => {
        if (verifyErr) return res.status(403).json("Token is not valid!");

        const postID = req.params.id;
        const query = "UPDATE posts SET `title`=? ,`description`=? ,`image`=?,`category`=? WHERE `id` = ? AND `user_id` = ?";

        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
        ];

        db.query(query, [...values, postID, userInfo.id], (queryErr, data) => {
            if (queryErr) {
                return res.status(500).json(queryErr);
            } else {
                return res.json("Post has been updated successfully");
            }
        });
    });
};



export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const query = "DELETE FROM posts WHERE `id`=? AND `user_id`=?"

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("This is not your post. Only it's admin can delete it.");
            else return res.json("Post has been deleted successfully.");
        })
    })
};
