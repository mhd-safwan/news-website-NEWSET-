import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Dash.css';

function Dash() {
  const [news, setNews] = useState([]);
  const [expandedNews, setExpandedNews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      navigate("/admin"); 
    } else {
      fetchNews();
    }
  }, [navigate]);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin?page=${currentPage}&limit=${itemsPerPage}");
      setNews(response.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this news item?");
    if (confirm) {
      try {
        await axios.delete("http://localhost:8000/delete/" + id);
        fetchNews(); 
      } catch (err) {
        console.error("Error deleting news:", err);
      }
    }
  };

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = news.slice(startIndex, endIndex);



  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };



  const toggleExpand = (id) => {
    setExpandedNews((prevExpandedNews) => ({
      ...prevExpandedNews,
      [id]: !prevExpandedNews[id],
    }));
  };

  return (
    <div>
      <div className="col-sm-8">
        <h2>News<b> admin dashboard</b></h2>
      </div>
      <div id="add-main">
        <Link to="/admin/logout">Logout</Link>
        <Link to="/admin/creat" className="btn btn-info add-new" id="add">Add+</Link>
      </div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-4"></div>
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
                {currentItems.map((item) => (
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
           <button
           id="pag"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
      id="pag"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
        </div>
      </div>
    </div>
  );
}

export default Dash;
