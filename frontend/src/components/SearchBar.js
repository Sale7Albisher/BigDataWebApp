  import React, { useState } from "react";

  const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState(""); 
    const [interval, setInterval] = useState("daily"); 

    const handleIntervalChange = (newInterval) => {
      setInterval(newInterval);
      if (keyword.trim()) {
        onSearch(keyword, newInterval); 
      }
    };

    const handleSearch = () => {
      if (keyword.trim()) {
        onSearch(keyword, interval); 
      } else {
        console.log("Please enter a valid keyword.");
      }
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", width: "300px" }}
        />

       
        <select
          value={interval}
          onChange={(e) => handleIntervalChange(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", width: "150px" }}
        >
          <option value="daily">Daily</option>
          <option value="hourly">Hourly</option>
        </select>

        
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
