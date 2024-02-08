const Itinerary = require("../models/itinerary");
const axios = require("axios");

const createItinerary = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, hotel } = req.body; // Ensure you're destructuring hotel here if it's part of the body

  // Define the external API request options
  const options = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
    params: {
      hotel_id: hotelId,
      arrival_date: checkInDate,
      departure_date: checkOutDate,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    // Fetching hotel details from external API
    const response = await axios.request(options);
    console.log("Hotel details fetched successfully:", response.data);

    // Combining fetched hotel details with existing hotel data from the request body
    const combinedHotelDetails = { ...hotel, ...response.data };

    // Creating a new itinerary in the database with combined hotel details
    const newItinerary = await Itinerary.create({
      userId: req.user._id, // Make sure req.user is populated correctly by your authentication middleware
      hotelDetails: combinedHotelDetails,
    });

    console.log("New itinerary created successfully:", newItinerary);
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error("Failed to fetch hotel details or create itinerary:", error);
    res.status(500).json({
      message: "Failed to fetch hotel details or create itinerary",
      error: error.message,
    });
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

const getItinerariesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const itineraries = await Itinerary.find({ userId: req.user_id, status });
    res.json(itineraries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* const createUpcomingTrip = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, hotel } = req.body;
  const { userId } = req.params; // Extract userId from request parameters

  // Define the external API request options
  const options = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
    params: {
      hotel_id: hotelId,
      arrival_date: checkInDate,
      departure_date: checkOutDate,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    // Fetching hotel details from external API
    const response = await axios.request(options);

    // Combining fetched hotel details with existing hotel data from the request body
    const combinedHotelDetails = { ...hotel, ...response.data };

    // Assuming you have a User model and each user has an 'upcomingTrips' array
    const user = await User.findById(userId); // Use userId instead of req.user._id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.upcomingTrips.push(combinedHotelDetails);

    await user.save();

    res.status(201).json(combinedHotelDetails);
  } catch (error) {
    console.error("Failed to create upcoming trip:", error);
    res.status(500).json({
      message: "Failed to create upcoming trip",
      error: error.message,
    });
  }
}; */
module.exports = {
  createItinerary,
  getItinerariesByStatus,
  getAllItineraries,
  getItineraryById,
  getItinerariesByUserId,
  updateItinerary,

  deleteItinerary,
};
