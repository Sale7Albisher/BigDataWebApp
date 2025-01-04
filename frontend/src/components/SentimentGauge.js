import React from "react";

const SentimentGauge = ({ sentiment }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "200px" }}>
      <h3>Average Sentiment</h3>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
        {sentiment.proportion
          ? `Most Common: ${sentiment.type} (${(sentiment.proportion * 100).toFixed(2)}%)`
          : "N/A"}
      </div>
    </div>
  );
};

export default SentimentGauge;
