import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.css";
import { FaArrowRight } from 'react-icons/fa';

function Card() {
  const [localNews, setLocalNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBreakingNews = async (count) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/admin?limit=${count}`);
      const breakingNewsData = response.data.filter(item => item.category === "Local");

      if (breakingNewsData.length < count) {
        setHasMore(false);
      }

      setLocalNews(breakingNewsData);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBreakingNews(visibleCount);
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className="container">
      <div className="row">
        {localNews.slice(0, visibleCount).map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={`http://localhost:8000/images/${item.img}`}
                className="card-img"
                alt={item.title}
              />
              <div className="card-body">
                <p className="card-text text-muted">Posted on {item.date}</p>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.des}</p>
                <Link to={`/news/${item._id}`} className="continue-reading">
                  <FaArrowRight className="arrow-icon" /> Continue reading
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-4">
          <button className="load-more-button" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
