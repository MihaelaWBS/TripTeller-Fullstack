import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
const ItineraryContext = createContext();
import { AuthContext } from "./Auth";
import { useSearch } from "./SearchContext";
export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const { checkInDate, checkOutDate } = useSearch();

  const { userId } = useContext(AuthContext);
  /*
  const [itinerary, setItinerary] = useState(() => {
    const localData = localStorage.getItem('itinerary');
    return localData ? JSON.parse(localData) : [];
  }); */
  const [itinerary, setItinerary] = useState([]);

  /*   useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]); */

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

  return (
    <ItineraryContext.Provider
      value={{ itinerary, setItinerary, addToItinerary, removeFromItinerary }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
