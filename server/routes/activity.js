const express = require("express");
const { authenticate } = require("../middleware/auth");

const {
  createActivity,
  getActivitiesByItinerary,
  deleteActivity,
  updateActivity,
} = require("../controllers/activities");

const activitiesRouter = express.Router();

activitiesRouter.get(
  "/itinerary/:itineraryId",
  authenticate,
  getActivitiesByItinerary
);

activitiesRouter.post("/", authenticate, createActivity);

activitiesRouter.put("/:activityId", authenticate, updateActivity);

activitiesRouter.delete("/:activityId", authenticate, deleteActivity);

module.exports = activitiesRouter;
