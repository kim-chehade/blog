import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  
    const queryCheck = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(queryCheck, [req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err);
        else if(data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const queryInsert = "INSERT INTO users (first_name, last_name, username, email, password) VALUES (?)";
        const values = [req.body.first_name, req.body.last_name, req.body.username, req.body.email, hash];

        db.query(queryInsert, [values], (err,data)=>{
            if(err) return res.json(err);
            else return res.status(200).json("User is created successfully.");
        });

    });

};

export const login = (req, res) => {
    const queryCheck = "SELECT * FROM users WHERE username = ?";
    db.query(queryCheck, [req.body.username], (err,data)=>{
        if(err) return res.json(err);
        else if(data.length === 0) return res.status(404).json("User not found!");
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        
        if(!isPasswordCorrect) return res.status(400).json("Wrong Username or Password!");

        const token = jwt.sign({id:data[0].id}, "jwtkey");
        const {password, ...other} = data[0];

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been Logged Out.")
};
