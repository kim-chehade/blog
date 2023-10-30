import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/posts.js";

const router = express.Router()

router.get("/:id", getPost); 
router.get("/", getPosts); 
router.post("/", addPost); 
router.delete("/:id", deletePost); 
router.put("/:id", updatePost); 


export default router;