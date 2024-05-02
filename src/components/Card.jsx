import React from "react";
import "./Card.css"; // Import CSS file for styling

const Card = ({ text }) => {
  return (
    <div className="card">
      <p className="phrase">{text}</p>
    </div>
  );
};

export default Card;
