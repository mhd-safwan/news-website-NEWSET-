import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Carousel.css';

const Carousel = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  
  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const limit = 3; 
        const response = await axios.get(`http://localhost:8000/breaking?$limit=${limit}`);
        setBreakingNews(response.data);
      } catch (err) {
        console.error("Error fetching breaking news:", err);
      }
    };

    fetchBreakingNews();
  }, []);


  return (
    <div id="breakingNewsCarousel" className="carousel slide" data-ride="carousel" data-interval="3000">
      <div className="carousel-inner">
        {breakingNews.map((item, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={`http://localhost:8000/images/${item.img}`} className="d-block w-100" alt={item.title} />
            <div className="carousel-caption d-none d-md-block">
            <Link to={`/news/${item._id}`} className="titlee" >
                  <h5>{item.title}</h5>
                </Link>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#breakingNewsCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#breakingNewsCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
