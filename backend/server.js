const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Tweet = require("./db/models/Tweet.js"); 
const connectDB = require("./db/connectDB.js"); 

const app = express();
const PORT = 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());



app.get("/api/tweets-stream", async (req, res) => {
  const { keyword, interval = "daily", chunkSize = 10 } = req.query;

  try {
    const query = keyword
      ? { text: { $regex: new RegExp(keyword, "i") } }
      : {};
    const tweets = await Tweet.find(query);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let index = 0;
    const totalTweets = tweets.length;

    const sendChunk = () => {
      if (index >= totalTweets) {
        res.write("event: done\n");
        res.write("data: {}\n\n");
        res.end(); 
        return;
      }

      const chunk = tweets.slice(index, index + chunkSize);
      const trendData = groupByInterval(chunk, interval);
      const totalSentiment = chunk.reduce((sum, tweet) => sum + (tweet.sentiment || 0), 0);
      const avgSentiment = chunk.length ? totalSentiment / chunk.length : 0;

      res.write(`event: chunk\n`);
      res.write(
        `data: ${JSON.stringify({
          tweets: chunk,
          trendData,
          sentiment: avgSentiment,
        })}\n\n`
      );

      index += chunkSize;
      setTimeout(sendChunk, 2000); 
    };

    const groupByInterval = (tweets, interval) => {
      const intervals = {};

      tweets.forEach((tweet) => {
        const date = new Date(tweet.created_at);
        let key;

        if (interval === "daily") {
          key = date.toISOString().split("T")[0];
        } else if (interval === "hourly") {
          key = `${date.toISOString().split("T")[0]} ${date.getUTCHours()}:00`;
        } else {
          throw new Error("Invalid interval specified. Use 'daily' or 'hourly'.");
        }

        if (!intervals[key]) {
          intervals[key] = 0;
        }
        intervals[key]++;
      });

      return Object.entries(intervals).map(([time, count]) => ({ time, count }));
    };

    sendChunk(); 
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});