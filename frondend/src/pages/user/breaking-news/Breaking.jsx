import React from "react";
import "./Breaking.css";
import Cardone from "../../../components/Breaking/Cardone";
import Carousel from "../../../components/carousel/Carousel";

function Breaking() {
  return (
    <div className="breaking-container">
      <div className="breaking-header">
        <h1>Breaking News</h1>
      </div>
      <div className="breaking-content">
      <Carousel />
        <Cardone/>
      </div>
    </div>
  );
}

export default Breaking;
