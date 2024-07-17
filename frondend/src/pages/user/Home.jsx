import React from "react";
import Card from "../../components/card/Card";
import MainCard from "../../components/maincard/Maincard";
import Carousel from "../../components/carousel/Carousel";
import {FaChevronRight } from 'react-icons/fa';


import "./Home.css";

function Home() {
  return (
    <div className="container">
      <Carousel />

      <div className="row mt-4">
        <div className="col-md-12">
          <MainCard />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Todays Local News</h2>
          <Card />
          <div className="swipe"><h4 className="swipe1">swipe <FaChevronRight /></h4></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
