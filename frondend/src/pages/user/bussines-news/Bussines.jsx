import React from "react";
import "./Bussines.css";
import Bcard from "../../../components/bussines/Bcard";

function Bussines() {
  return (
    <div className="bussines-container">
      <div className="bussines-header">
        <h1>Bussines News</h1>
      </div>
      <div className="bussines-content">
        <Bcard />      
      </div>
    </div>
  );
}

export default Bussines;
