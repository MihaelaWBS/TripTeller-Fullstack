import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
const ItineraryContext = createContext();
import { AuthContext } from "./Auth";

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
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
    // Check if the hotel is already in the itinerary
    const isHotelAdded = itinerary.some(
      (item) => item.hotel_id === hotel.hotel_id
    );

    if (isHotelAdded) {
      console.log("Hotel is already in the itinerary");
      return;
    }

    try {
      console.log("Adding hotel to itinerary:", hotel);
      const response = await axiosInstance.post(`/api/itineraries/add`, {
        userId: userId,
        hotel,
      });

      console.log("API response:", response.data);

      if (response.status === 201) {
        const updatedHotel = { ...hotel, itinerary_id: response.data._id };

        setItinerary((prevItinerary) => {
          return [...prevItinerary, updatedHotel, response.data, hotel];
        });
      }
    } catch (error) {
      console.log("Error adding hotel to itinerary:", error);
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
