const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {

    id: { type: String, unique: true, required: true },
    text: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    sentiment: {
      label: { type: String, required: true },
    },
    created_at: { type: String, required: true },
    geo: {
      lat: { type: Number, required: false },
      lon: { type: Number, required: false },
    },
  },
  { collection: "stream_data" }
);




module.exports = mongoose.model("Tweet", tweetSchema);
