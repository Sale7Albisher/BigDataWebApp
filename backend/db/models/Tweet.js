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
    location: {
      type: {
        type: String, 
        default: "Point",
      },
      coordinates: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
      },
    },
  },
  { collection: "tweets" }
);

module.exports = mongoose.model("Tweet", tweetSchema);
