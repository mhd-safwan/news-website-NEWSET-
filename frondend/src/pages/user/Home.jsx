import React from "react";
import Card from "../../components/card/Card";
import MainCard from "../../components/maincard/Maincard";
import Carousel from "../../components/carousel/Carousel";

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
        </div>
      </div>
    </div>
  );
}

export default Home;
