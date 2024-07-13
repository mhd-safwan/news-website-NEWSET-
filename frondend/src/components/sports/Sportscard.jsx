import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sportscard.css";
import { FaChevronRight } from 'react-icons/fa';

function SportsCard() {
  const [Sports, setSports] = useState([]);

  useEffect(() => {
    const fetchsportsNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin");
        const SportsNewsData = response.data.filter(item => item.category === "sports");
        setSports(SportsNewsData);
      } catch (err) {
        console.error("Error fetching sports news:", err);
      }
    };

    fetchsportsNews();
  }, []);

  return (
    <div className="container">
      {Sports.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`http://localhost:8000/images/${item.img}`}
                className="card-img"
                alt={item.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Posted on {item.date}</p>
                <p className="card-text">{item.des}</p>
                <Link to={`/news/${item._id}`} className="continue-reading">
                  <FaChevronRight className="arrow-icon" /> Continue reading
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SportsCard;
