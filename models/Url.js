import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "lastUsed" },
  }
);

module.exports = mongoose.model("Url", UrlSchema);
