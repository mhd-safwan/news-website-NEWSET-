import React, { useState } from "react";
import "./Creat.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Creatnews() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [des, setDes] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const Submit = async (e) => {
    e.preventDefault();
    
    if (!file || !title || !date || !des || !story || !category) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    
    const data = new FormData();
    data.append("file", file);
    data.append("title", title);
    data.append("des", des);
    data.append("story", story);
    data.append("date", date);
    data.append("category", category);

    try {
      const response = await axios.post("http://localhost:8000/creat", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/admin/dash");
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      } else {
        console.error("No response data");
      }
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h2>Create News</h2>
        <form onSubmit={Submit}>
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
            <label htmlFor="category">Category</label>
            <select name="category" value={category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              <option value="sports">Sports</option>
              <option value="breaking">Breaking News</option>
              <option value="business">Business News</option>
              <option value="Local">Local news</option>
            </select>
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Creatnews;
