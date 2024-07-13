import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Maincard.css";
import { FaChevronRight } from 'react-icons/fa';

function MainCard() {
  const [news, setNews] = useState([]);
  const [Count, setCount] = useState(5); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const fetchNews = async (count) => {
    try {
      const response = await axios.get(`http://localhost:8000/admin?limit=${count}`);
      if (response.data.length < count) {
        setHasMore(false);
      }
      setNews(response.data);
    } catch (err) {
      console.error("Error fetching news:", err);
      console.error(
        "Error details:",
        err.response ? err.response.data : "No response data"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(Count);
  }, [Count]);

  const loadMore = () => {
    setCount(Count => Count + 1); 
  };

  return (
    <div className="container">
      {news.slice(0, Count).map((item, index) => (
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
                <p className="card-text">{item.des}</p>
                <Link to={`/news/${item._id}`} className="continue-reading">
                  <FaChevronRight className="arrow-icon" /> Continue reading
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default MainCard;
