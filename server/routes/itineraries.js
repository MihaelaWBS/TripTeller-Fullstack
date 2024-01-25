const express = require("express");
/* const authenticate = require("../middleware/auth");
 */ const itineraryRouter = express.Router();
const {
	createItinerary,
	getAllItineraries,
	getItineraryById,
	updateItinerary,
	deleteItinerary,
} = require("../controllers/itineraries");
/* itineraryRouter.use(authenticate);
 */itineraryRouter.post("/", createItinerary);
itineraryRouter.get("/", getAllItineraries);
itineraryRouter.get("/:id", getItineraryById);
itineraryRouter.put("/:id", updateItinerary);
itineraryRouter.delete("/:id", deleteItinerary);
module.exports = itineraryRouter;
