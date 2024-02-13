const express = require("express");
const { authenticate } = require("../middleware/auth");
const {
  createUpcomingTrip,
  findUpcomingTrips,
  getUpcomingTripsByUserId,
  findUpcomingTripsById,
  cancelUpcomingTrip,
  getCancelledTripsByUserId,
  completeUpcomingTrip, // Add this line
  getCompletedTripsByUserId, // Add this line
} = require("../controllers/upcomingTrip");

const upcomingTripsRouter = express.Router();

// Add these lines
upcomingTripsRouter.put(
  "/complete/:tripId",
  authenticate,
  completeUpcomingTrip
);
upcomingTripsRouter.get(
  "/completed/user/:userId",
  authenticate,
  getCompletedTripsByUserId
);

upcomingTripsRouter.get(
  "/cancelled/user/:userId",
  authenticate,
  getCancelledTripsByUserId
);

// Other routes
upcomingTripsRouter.post("/add", authenticate, createUpcomingTrip);
upcomingTripsRouter.get(
  "/user/:userId",
  authenticate,
  getUpcomingTripsByUserId
);
upcomingTripsRouter.put("/cancel/:tripId", authenticate, cancelUpcomingTrip);
upcomingTripsRouter.get("/:id", authenticate, findUpcomingTripsById);
upcomingTripsRouter.get("/", authenticate, findUpcomingTrips);

module.exports = upcomingTripsRouter;
