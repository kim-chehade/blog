import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import comRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express()

app.use(express.json())
app.use(cookieParser())


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../web/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
  return res.status(200).json(req.file.filename);
});

app.use("/uploads", express.static("./public/upload"));
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", comRoutes)


app.listen(8800, () => {
  console.log("Connected to backend.")
})
