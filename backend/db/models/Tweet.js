const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    id: { type: String, unique: true, required: true },
=======
    unique_tweet_id: { type: String, unique: true, required: true },
>>>>>>> c78c26acd02abddf32a6e551520ae955d40ddeb4
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

<<<<<<< HEAD

=======
tweetSchema.index({ text: "text" });
tweetSchema.index({ sentiment: 1 });
tweetSchema.index({ "user.screen_name": 1 });
tweetSchema.index({ created_at: 1 });
tweetSchema.index({ hashtags: 1 });
tweetSchema.index({ unique_tweet_id: 1 }, { unique: true });
>>>>>>> c78c26acd02abddf32a6e551520ae955d40ddeb4

module.exports = mongoose.model("Tweet", tweetSchema);
