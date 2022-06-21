const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
      max: 60,
      trim: true,
    },
    description: {
      type: String,
      default: "no description yet",
      max: 200,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      default: 0,
      trim: true,
    },
    longitude: {
      type: Number,
      default: 0,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("locate", locationSchema);
