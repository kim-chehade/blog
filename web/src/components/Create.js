import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Create = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  const [category, setCategory] = useState(state?.category || "");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageURL = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
          title,
          description: value,
          category,
          image: file ? imageURL : "",
        })
        :
        await axios.post(`/posts/`, {
          title,
          description: value,
          category,
          image: file ? imageURL : "",
          created: moment(Date.now()).format("DD-MM-YYY"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="newblog">
      <div className="content">

        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => getText(setTitle(e.target.value))}
        />
        <div className="editorContainer">
          <ReactQuill className="edit" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>

          <div className="buttons">
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category">
            <input type="radio" checked={category === "art"} name="cat" id="art" value="art" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "science"} name="cat" id="science" value="science" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "technology"} name="cat" id="technology" value="technology" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "cinema"} name="cat" id="cinema" value="cinema" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "design"} name="cat" id="design" value="design" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "food"} name="cat" id="food" value="food" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
          <div className="category">
            <input type="radio" checked={category === "others"} name="cat" id="others" value="others" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="others">Others</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
