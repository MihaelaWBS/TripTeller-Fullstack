import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
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

      // Fetch additional details from RapidAPI
      const options = {
        method: "GET",
        url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
        params: {
          hotel_id: hotel.hotel_id,
          arrival_date: checkInDate,
          departure_date: checkOutDate,
          adults: "1",
          children_age: "0",
          room_qty: "1",
          languagecode: "en-us",
          currency_code: "EUR",
        },
        headers: {
          "X-RapidAPI-Key":
            "67e6b85d33mshd5e8a69a6d26d50p140b38jsn02c7a8bf3e37",
          "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
        },
      };

      const rapidApiResponse = await axiosInstance.request(options);

      // Merge the hotel data with the RapidAPI data
      const hotelWithDetails = { ...hotel, ...rapidApiResponse.data };

      const response = await axiosInstance.post(`/api/itineraries/add`, {
        userId: userId,
        hotel: hotelWithDetails,
      });

      console.log("API response:", response.data);

      if (response.status === 201) {
        const updatedHotel = {
          ...hotelWithDetails,
          itinerary_id: response.data._id,
        };

        setItinerary((prevItinerary) => {
          return [...prevItinerary, updatedHotel];
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
