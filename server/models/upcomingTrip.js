const mongoose = require("mongoose");

const UpcomingTripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelDetails: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "cancelled", "completed"],
    default: "upcoming",
  },
});

module.exports = mongoose.model("UpcomingTrip", UpcomingTripSchema);
