import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Dash.css';

function Dash() {
  const [news, setNews] = useState([]);
  const [expandedNews, setExpandedNews] = useState({});

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin");
      setNews(response.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/delete/" + id);
      fetchNews(); 
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedNews((prevExpandedNews) => ({
      ...prevExpandedNews,
      [id]: !prevExpandedNews[id]
    }));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <div className="col-sm-8">
        <h2>News<b> admin dashboard</b></h2>
      </div>
      <div id="add-main">
      <Link to="/admin/Creat" className="btn btn-info add-new" id="add">Add+</Link>
      </div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-4">
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="date">Date</th>
                  <th className="cat">Category</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Story</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item._id}>
                    <td className="date">{item.date}</td>
                    <td className="cat">{item.category}</td>
                    <td id="title-cell">{item.title}</td>
                    <td>
                      <div id="des" className={`scrollable-content ${expandedNews[item._id] ? 'expanded' : ''}`}>
                        {item.des}
                      </div>
                      <button className="more-button" onClick={() => toggleExpand(item._id)}>
                        {expandedNews[item._id] ? "Less" : "More"}
                      </button>
                    </td>
                    <td>
                      <div className={`scrollable-content ${expandedNews[item._id] ? 'expanded' : ''}`}>
                        {item.story}
                      </div>
                      <button className="more-button" onClick={() => toggleExpand(item._id)}>
                        {expandedNews[item._id] ? "Less" : "More"}
                      </button>
                    </td>
                    <td>
                      <img src={`http://localhost:8000/images/${item.img}`} alt={item.title} />
                    </td>
                    <td className="bt">
                      <Link className="edit" to={`/admin/add/${item._id}`}>Update</Link>
                      <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;