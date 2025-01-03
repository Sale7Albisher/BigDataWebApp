const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    geo: {
      lat: { type: Number, required: false },
      lon: { type: Number, required: false },
    },
    sentiment: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    hashtags: { type: [String], default: [] },
    user: {
      id: { type: String, required: false },
      name: { type: String, required: false },
      screen_name: { type: String, required: false },
    },
  },
  { collection: "stream_data" } 
);

module.exports = mongoose.model("Tweet", tweetSchema);
