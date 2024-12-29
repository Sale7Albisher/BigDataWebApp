import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import SentimentGauge from "./components/SentimentGauge";
import TrendChart from "./components/TrendChart";

function App() {
  const [tweets, setTweets] = useState([]);
  const [sentiment, setSentiment] = useState(0);
  const [trendData, setTrendData] = useState([]);

  const handleSearch = async (keyword, interval = "daily") => {
    try {
      const response = await fetch(`http://localhost:5000/api/tweets?keyword=${keyword}&interval=${interval}`);
      const data = await response.json();

      setTweets(data.tweets);
      setTrendData(data.trendData);
      setSentiment(data.sentiment);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const handleTimeFrameChange = async (newInterval) => {
    const keyword = document.getElementById("search-input").value; // Get the current search keyword
    if (keyword.trim()) {
      await handleSearch(keyword, newInterval); // Fetch new data based on the selected time frame
    }
  };

  return (
    <div className="App">
      <h1>Twitter Stream Visualization</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <MapView tweets={tweets} />
        <SentimentGauge sentiment={sentiment} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <TrendChart trendData={trendData} onTimeFrameChange={handleTimeFrameChange} />
      </div>
    </div>
  );
}

export default App;
