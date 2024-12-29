const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

 const mockTweets = [
    { id: 1, text: "Love how fast serverless architecture scales!", geo: { lat: 34.0522, lon: -118.2437 }, sentiment: 0.9, created_at: "2024-12-22T06:00:00Z" },
    { id: 2, text: "Building APIs with GraphQL is such a game changer.", geo: { lat: 51.5074, lon: -0.1278 }, sentiment: 0.85, created_at: "2024-12-22T06:45:00Z" },
    { id: 3, text: "I'm excited to try out the new JavaScript framework!", geo: { lat: 48.8566, lon: 2.3522 }, sentiment: 0.8, created_at: "2024-12-22T07:30:00Z" },
    { id: 4, text: "My productivity skyrocketed after mastering Docker!", geo: { lat: 40.7306, lon: -73.9352 }, sentiment: 0.9, created_at: "2024-12-23T08:00:00Z" },
    { id: 5, text: "SQL vs NoSQL – both have their pros and cons.", geo: { lat: 37.7749, lon: -122.4194 }, sentiment: 0.7, created_at: "2024-12-23T08:45:00Z" },
    { id: 6, text: "Just discovered the magic of web accessibility.", geo: { lat: 34.0522, lon: -118.2437 }, sentiment: 0.85, created_at: "2024-12-24T09:15:00Z" },
    { id: 7, text: "Can't wait to dive deeper into Rust programming.", geo: { lat: 52.5200, lon: 13.4050 }, sentiment: 0.75, created_at: "2024-12-25T09:45:00Z" },
    { id: 8, text: "I just finished building my first PWA!", geo: { lat: -33.8688, lon: 151.2093 }, sentiment: 0.9, created_at: "2024-12-25T10:30:00Z" },
    { id: 9, text: "Containers make deployment so much easier.", geo: { lat: 41.9028, lon: 12.4964 }, sentiment: 0.8, created_at: "2024-12-25T11:00:00Z" },
    { id: 10, text: "Cloud computing is reshaping how we build apps.", geo: { lat: 39.9042, lon: 116.4074 }, sentiment: 0.85, created_at: "2024-12-23T11:30:00Z" },
    { id: 11, text: "API versioning is such an important topic!", geo: { lat: 55.7558, lon: 37.6173 }, sentiment: 0.8, created_at: "2024-12-27T12:00:00Z" },
    { id: 12, text: "Nothing beats a well-written README file.", geo: { lat: 35.6895, lon: 139.6917 }, sentiment: 0.9, created_at: "2024-12-27T12:30:00Z" },
    { id: 13, text: "Refactoring code is always a rewarding challenge.", geo: { lat: 40.7128, lon: -74.0060 }, sentiment: 0.85, created_at: "2024-12-27T13:00:00Z" },
    { id: 14, text: "Excited to see what AI will bring to web development.", geo: { lat: 28.6139, lon: 77.2090 }, sentiment: 0.95, created_at: "2024-12-22T13:30:00Z" },
    { id: 15, text: "No more bugs! Debugging is an art.", geo: { lat: 37.5665, lon: 126.9780 }, sentiment: 0.8, created_at: "2024-12-22T14:00:00Z" },

];

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


app.get("/api/tweets", (req, res) => {
  const { keyword, interval = "daily" } = req.query;

  const filteredTweets = mockTweets.filter((tweet) =>
    tweet.text.toLowerCase().includes(keyword.toLowerCase())
  );

  const trendData = groupByInterval(filteredTweets, interval);

  const totalSentiment = filteredTweets.reduce((sum, tweet) => sum + tweet.sentiment, 0);
  const avgSentiment = filteredTweets.length ? totalSentiment / filteredTweets.length : 0;

  res.json({
    tweets: filteredTweets,
    trendData,
    sentiment: avgSentiment, 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


