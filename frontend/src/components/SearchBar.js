import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState(""); // State for the search keyword
  const [interval, setInterval] = useState("daily"); // State for interval selection

  // Trigger search when the interval is updated
  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    if (keyword.trim()) {
      onSearch(keyword, newInterval); // Call the onSearch function when interval changes
    }
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword, interval); // Call the onSearch function with keyword and interval
    } else {
      console.log("Please enter a valid keyword.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      {/* Input field for entering the keyword */}
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ padding: "8px", fontSize: "16px", width: "300px" }}
      />

      {/* Dropdown for selecting interval */}
      <select
        value={interval}
        onChange={(e) => handleIntervalChange(e.target.value)}
        style={{ padding: "8px", fontSize: "16px", width: "150px" }}
      >
        <option value="daily">Daily</option>
        <option value="hourly">Hourly</option>
      </select>

      {/* Search button */}
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
