import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import SentimentGauge from "./components/SentimentGauge";
import TrendChart from "./components/TrendChart";

function App() {
  const [tweets, setTweets] = useState([]);
  const [sentiment, setSentiment] = useState({ type: "neutral", proportion: 0 });
  const [trendData, setTrendData] = useState([]);
  const [streaming, setStreaming] = useState(false);

  const handleSearch = (keyword, interval = "daily") => {
    if (streaming) return;


    const eventSource = new EventSource(
      `http://localhost:5000/api/tweets-stream?keyword=${keyword}&interval=${interval}`
    );

    setStreaming(true);

    eventSource.addEventListener("chunk", (event) => {
      const data = JSON.parse(event.data);

      setTweets((prevTweets) => [...(prevTweets || []), ...data.tweets]);
      setTrendData((prevTrendData) => [...(prevTrendData || []), ...data.trendData]);
      setSentiment(data.sentiment);
    });

    eventSource.addEventListener("done", () => {
      console.log("Streaming completed.");
      setStreaming(false);
      eventSource.close();

     
    });

    eventSource.onerror = (error) => {
      console.error("Error in SSE:", error);
      setStreaming(false);
      eventSource.close();
    };
  };

  const reset = () => {
    setTweets([]);
    setSentiment({ type: "neutral", proportion: 0 });
    setTrendData([]);
    setStreaming(false);
  };

  return (
    <div className="App" style={{ backgroundColor: "#131722", color: "white", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Twitter Stream Visualization</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ overflowY: "scroll", maxHeight: "80vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ flex: 1, marginRight: "20px", marginTop: "37px" }}>
            <MapView tweets={tweets} />
          </div>
          <div style={{ flex: 1, marginLeft: "20px" }}>
            <TrendChart trendData={trendData} />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <SentimentGauge sentiment={sentiment} />
        </div>
        <button
          onClick={reset}
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FF4C4C",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;

