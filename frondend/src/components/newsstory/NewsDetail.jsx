
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./NewsDetail.css";

const NewsDetail = () => {
  const [news, setNews] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/single/${id}`);
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news detail:", err);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (!news) return <div></div>;

  return (
    <div className="news-detail">
      <h1 className="news-detail-title">{news.title}</h1>
      <img
        src={`http://localhost:8000/images/${news.img}`}
        alt={news.title}
        className="news-detail-img"
      />
      
      <p className="news-detail-date">Posted on {news.date}</p>
      <p className="news-detail-description">{news.des}</p>
      <div className="news-detail-story">
        <h2>Full Story</h2>
        <p>{news.story}</p> 
      </div>
    </div>
  );
};

export default NewsDetail;
