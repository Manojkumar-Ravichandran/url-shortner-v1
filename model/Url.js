import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
    unique: true
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);