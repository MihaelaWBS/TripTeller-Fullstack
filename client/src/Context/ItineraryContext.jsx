import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
const ItineraryContext = createContext();
import { AuthContext } from "./Auth";
import { useSearch } from "./SearchContext";
export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const { checkInDate, checkOutDate } = useSearch();
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  const { userId } = useContext(AuthContext);

  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = async (hotel) => {
    // Prepare the request body with hotel ID, check-in/check-out dates, and hotel details
    const requestBody = {
      hotelId: hotel.hotel_id,
      checkInDate,
      checkOutDate,
      hotel, // Assuming this contains basic hotel details you want to save initially
    };

    try {
      const response = await axios.post("/api/itineraries/add", requestBody);
      console.log("Itinerary item created:", response.data);

      // Update local state or UI as needed
    } catch (error) {
      console.error("Failed to add hotel to itinerary:", error);
    }
  };

  const removeFromItinerary = (hotelId) => {
    setItinerary((prevItinerary) =>
      prevItinerary.filter((hotel) => hotel.hotel_id !== hotelId)
    );
  };

  const addTrip = (hotel, checkInDate, checkOutDate) => {
    setUpcomingTrips((prevTrips) => [
      ...prevTrips,
      {
        id: Date.now(),
        hotelId: hotel.hotel_id,
        checkInDate,
        checkOutDate,
        hotel,
      },
    ]);
  };

  const fetchItinerariesByStatus = async (status) => {
    try {
      const response = await axios.get(`/api/itineraries/${status}`, {
        headers: {
          // Add your headers here if needed, like Authorization header
        },
      });
      return response.data; // this will return the itineraries
    } catch (error) {
      console.error("Failed to fetch itineraries by status:", error);
      throw error;
    }
  };

  const fetchActivitiesByItineraryId = async (itineraryId) => {
    try {
      const response = await axios.get(`/api/activities/${itineraryId}`);
      return response.data; // this will return the activities
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      throw error;
    }
  };

  const setCurrentItinerary = (itineraryId) => {
    const currentItinerary = itineraries.find(
      (itinerary) => itinerary._id === itineraryId
    );
    setItinerary(currentItinerary);
  };
  return (
    <ItineraryContext.Provider
      value={{
        itinerary,
        setItinerary,
        fetchItinerariesByStatus,
        addToItinerary,
        removeFromItinerary,
        fetchActivitiesByItineraryId,
        upcomingTrips,
        addTrip,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
