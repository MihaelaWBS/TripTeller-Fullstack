const Activity = require("../models/activity");
const Itinerary = require("../models/itinerary");
const createActivity = async (req, res) => {
  const { day, time, content, itineraryId } = req.body;

  if (!day || !time || !content || !itineraryId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newActivity = new Activity({
      day,
      time,
      content,
      itinerary: itineraryId,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: error.message });
  }
};

const getActivitiesByItinerary = async (req, res) => {
  const itineraryId = req.params.itineraryId;
  try {
    const activities = await Activity.find({ itinerary: itineraryId });
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateActivity = async (req, res) => {
  const { activityId } = req.params; // Assuming you're passing activityId as a URL parameter
  const { day, time, content, itineraryId } = req.body; // Including itineraryId is optional for additional verification

  try {
    // Optional: Verify the activity belongs to the correct itinerary
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Additional check: if you passed itineraryId and want to verify it matches
    if (itineraryId && activity.itinerary.toString() !== itineraryId) {
      return res.status(403).json({
        message: "Activity does not belong to the specified itinerary",
      });
    }

    // Update the activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { day, time, content }, // or use req.body if you're updating the whole object and you've validated/whitelisted the fields
      { new: true } // Return the updated document
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: error.message });
  }
};
const deleteActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await Activity.findByIdAndDelete(activityId);
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  updateActivity,
  createActivity,
  getActivitiesByItinerary,
  deleteActivity,
};
