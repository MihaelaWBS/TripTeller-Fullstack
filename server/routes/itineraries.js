const express = require("express");
const { authenticate } = require("../middleware/auth");
const itineraryRouter = express.Router();
const {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  getItinerariesByUserId,
  deleteItinerary,
} = require("../controllers/itineraries");
itineraryRouter.use(authenticate);
itineraryRouter.post("/add", createItinerary);
itineraryRouter.get("/user/:userId", getItinerariesByUserId);
itineraryRouter.get("/", getAllItineraries);
itineraryRouter.get("/:id", getItineraryById);
itineraryRouter.put("/:id", updateItinerary);
itineraryRouter.delete("/:id", deleteItinerary);
module.exports = itineraryRouter;
