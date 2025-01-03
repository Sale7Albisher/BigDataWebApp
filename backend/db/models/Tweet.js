const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    unique_tweet_id: { type: String, unique: true, required: true },
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

tweetSchema.index({ text: "text" });
tweetSchema.index({ sentiment: 1 });
tweetSchema.index({ "user.screen_name": 1 });
tweetSchema.index({ created_at: 1 });
tweetSchema.index({ hashtags: 1 });
tweetSchema.index({ unique_tweet_id: 1 }, { unique: true });

module.exports = mongoose.model("Tweet", tweetSchema);
