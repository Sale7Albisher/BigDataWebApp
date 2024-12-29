import React from "react";

const SentimentGauge = ({ sentiment }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Average Sentiment</h3>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: sentiment > 0 ? "green" : "red" }}>
        {sentiment !== null ? sentiment.toFixed(2) : "N/A"}
      </div>
    </div>
  );
};

export default SentimentGauge;
