import React from "react";
import "./Sports.css";
import SportsCard from "../../../components/sports/Sportscard";

function Sports() {
  return (
    <div className="breaking-container">
      <div className="breaking-header">
        <h1>Sports News</h1>
      </div>
      <div className="breaking-content">
        <SportsCard />
      
      </div>
    </div>
  );
}

export default Sports;
