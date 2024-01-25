const Itinerary = require("../models/itinerary");

const createItinerary = async (req, res) => {
  try {
    const newItinerary = await Itinerary.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllItineraries = async (req, res) => {
  try {
    const itinerary = await Itinerary.find().populate(
      "userId",
      "username email"
    );
    res.json(itinerary);
  } catch (error) {
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
};
