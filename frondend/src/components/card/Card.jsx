import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.css";
import { FaArrowRight,FaChevronRight } from 'react-icons/fa';

function Card() {
  const [localNews, setLocalNews] = useState([]);

  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/sort?category=Local`);


      setLocalNews(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  return (
    <div className="news-container">
      <div className="news-row">
        {localNews.map((item, index) => (
          <div className="news-card" key={index}>
            <div className="news-card-content">
              <img
                src={`http://localhost:8000/images/${item.img}`}
                className="news-card-img"
                alt={item.title}
              />
              <div className="news-card-body">
                <p className="news-card-date text-muted">Posted on {item.date}</p>
                <h5 className="news-card-title">{item.title}</h5>
                <p className="news-card-description">{item.des}</p>
                <Link to={`/news/${item._id}`} className="news-card-link">
                  <FaArrowRight className="news-card-arrow-icon" /> Continue reading
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
}

export default Card;
