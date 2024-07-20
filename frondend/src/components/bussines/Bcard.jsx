import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa';
import "./Bcard.css";

function Bcard() {
  const [businessNews, setBusinessNews] = useState([]);

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/sort?category=business`);

        setBusinessNews(response.data);
      } catch (err) {
        console.error("Error fetching business news:", err);
      }
    };

    fetchBusinessNews();
  }, []);

  return (
    <div className="modern-card-container">
      {businessNews.length > 0 ? (
        businessNews.map((item, index) => (
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
        <p>No business news available.</p>
      )}
    </div>
  );
}

export default Bcard;
