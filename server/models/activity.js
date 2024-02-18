const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  day: String,
  time: String,
  content: String,
  itinerary: { type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" },
});

module.exports = mongoose.model("Activity", activitySchema);
