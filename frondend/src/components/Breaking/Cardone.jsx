import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa';
import "./Cardone.css";

function Cardone() {
  const [breakingsNews, setBreakingsNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/sort?category=breaking`);
        setBreakingsNews(response.data);
      } catch (err) {
        console.error("Error fetching breaking news:", err);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="modern-card-container">
      {breakingsNews.length > 0 ? (
        breakingsNews.map((item, index) => (
          <div className="modern-card" key={index}>
            <img
              src={`http://localhost:8000/images/${item.img}`}
              alt={item.title}
              className="modern-card-image"
            />
            <div className="modern-card-text">
              <h2>{item.title}</h2>
              <p className="post-date">Posted on {item.date}</p>
              <p>{item.des}</p>
              <Link to={`/news/${item._id}`} className="continue-reading">
                <FaChevronRight className="arrow-icon" /> Continue reading
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No breaking news available.</p>
      )}
    </div>
  );
}

export default Cardone;
