import React, { useState, useEffect } from "react";
import "./Add.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [des, setDes] = useState("");
  const [story, setStory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/single/${id}`)
      .then((result) => {
        console.log("result", result.data);
        setTitle(result.data.title);
        setDes(result.data.des);
        setStory(result.data.story);
        setDate(result.data.date);
        if (result.data.img) {
          setImagePreview(`http://localhost:8000/images/${result.data.img}`);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
      const Data = new FormData();
      Data.append("title", title);
      Data.append("des", des);
      Data.append("story", story);
      Data.append("date", date);
      if (file) {
        Data.append("img", file);
      } else if (imagePreview) {
        Data.append("img", imagePreview.split('/').pop()); 
      }
      try {
      const response = await axios.put(`http://localhost:8000/addnews/${id}`, Data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      navigate("/admin/dash");
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      } else {
        console.error("Error without response data");
      }
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h2>Update News</h2>
        <form onSubmit={submit}>
          <div className="form">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </div>

          <div className="form">
            <label htmlFor="story">Story</label>
            <textarea
              name="story"
              placeholder="Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>

          <div className="form">
            <label htmlFor="img">Image</label>
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>

          <button type="submit" className="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
