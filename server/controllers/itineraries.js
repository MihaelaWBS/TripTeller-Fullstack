const Itinerary = require("../models/itinerary");

const createItinerary = async (req, res) => {
  try {
    const newItinerary = await Itinerary.create({
      userId: req.user._id,
      hotelDetails: req.body.hotel, // Save the hotel details
    });
    console.log(newItinerary); // Add this line
    res.status(201).json(newItinerary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getAllItineraries = async (req, res) => {
  try {
    const itinerary = await Itinerary.find().populate(
      "userId",
      "username email"
    );
    console.log(itinerary); // Add this line
    res.json(itinerary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getItineraryById = async (req, res) => {
  const { id } = req.params;
  try {
    // const itinerary = await Itinerary.findById(id) //return itinerary object
    const itinerary = await Itinerary.find({ _id: id }).populate(
      "userId",
      "username email"
    ); //returns array
    if (itinerary.length === 0) {
      res.status(404).json({ message: `Itinerary with id ${id} Not Found` });
    } else {
      res.json(itinerary[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    // const updatedItinerary = await Itinerary.findByIdAndUpdate(id, req.body, { new: true });
    const updatedItinerary = await Itinerary.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    ); // { new: true } return the new updated doc in the db

    if (!updatedItinerary) {
      res.status(404).json({ message: `Itinerary with id ${id} Not Found` });
    } else {
      res.json(updatedItinerary);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    // const deletedItinerary = await Itinerary.findByIdAndDelete(id );
    const deletedItinerary = await Itinerary.findOneAndDelete({ _id: id });

    if (!deletedItinerary) {
      res.status(404).json({ message: `Itinerary with id ${id} Not Found` });
    } else {
      res.json(deletedItinerary);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getItinerariesByUserId = async (req, res) => {
  const { userId } = req.params;
  // Ensure the request is made by an authenticated user and they are requesting their own itineraries
  if (req.user && req.user._id.toString() === userId) {
    try {
      const itineraries = await Itinerary.find({ userId: userId });
      if (itineraries.length === 0) {
        return res
          .status(404)
          .json({ message: `No itineraries found for user ${userId}` });
      }
      res.json(itineraries);
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).json({ message: error.message });
    }
  } else {
    // If the user is not authenticated or is trying to access someone else's itineraries
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  getItinerariesByUserId,
  updateItinerary,
  deleteItinerary,
};
