const UpcomingTrip = require("../models/upcomingTrip");
const Itinerary = require("../models/itinerary");

const createUpcomingTrip = async (req, res) => {
  const { hotelId } = req.body;
  const userId = req.user._id;

  try {
    const itineraryItem = await Itinerary.findOne({
      userId,
      "hotelDetails.hotel_id": hotelId,
    });

    if (!itineraryItem) {
      return res.status(404).json({ message: "Hotel not found in itinerary" });
    }

    const hotelDetailsToSave = itineraryItem.hotelDetails;

    const newUpcomingTrip = new UpcomingTrip({
      userId: userId,
      hotelDetails: hotelDetailsToSave,
      status: "upcoming",
    });

    await newUpcomingTrip.save();

    res.status(201).json(newUpcomingTrip);
  } catch (error) {
    console.error("Failed to create upcoming trip:", error);
    res.status(500).json({
      message: "Failed to create upcoming trip",
      error: error.message,
    });
  }
};

const findUpcomingTrips = async (req, res) => {
  try {
    const trips = await UpcomingTrip.find().populate("userId");
    res.json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findUpcomingTripsById = async (req, res) => {
  const { id } = req.params;
  try {
    // const itinerary = await Itinerary.findById(id) //return itinerary object
    const trip = await UpcomingTrip.find({ _id: id }).populate(
      "userId",
      "username email"
    ); //returns array
    if (trip.length === 0) {
      res.status(404).json({ message: `trip with id ${id} Not Found` });
    } else {
      res.json(trip[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUpcomingTripsByUserId = async (req, res) => {
  const { userId } = req.params;

  // Log the values of req.user and userId
  console.log("req.user:", req.user);
  console.log("userId:", userId);

  // Ensure the request is made by an authenticated user and they are requesting their own itineraries
  if (req.user && req.user._id.toString() === userId) {
    try {
      const trips = await UpcomingTrip.find({ userId: userId });
      if (trips.length === 0) {
        return res
          .status(404)
          .json({ message: `No trips found for user ${userId}` });
      }
      res.json(trips);
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).json({ message: error.message });
    }
  } else {
    // If the user is not authenticated or is trying to access someone else's trips
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

const cancelUpcomingTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    const trip = await UpcomingTrip.findOneAndUpdate(
      { _id: tripId },
      { status: "cancelled" },
      { new: true }
    );
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to cancel trip", error: error.message });
  }
};

const getCancelledTripsByUserId = async (req, res) => {
  try {
    const trips = await UpcomingTrip.find({
      userId: req.params.userId,
      status: "cancelled",
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching cancelled trips:", error);
    res.status(500).send();
  }
};

module.exports = {
  createUpcomingTrip,
  findUpcomingTrips,
  getCancelledTripsByUserId,
  getUpcomingTripsByUserId,
  findUpcomingTripsById,
  cancelUpcomingTrip,
};
