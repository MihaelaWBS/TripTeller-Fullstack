const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelDetails: {
    type: Object, // This field should be able to hold an object
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "cancelled", "completed"],
    default: "upcoming",
  },

  // ... any other fields your itinerary might have
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
