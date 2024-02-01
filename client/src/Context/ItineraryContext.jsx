import React, { createContext, useContext, useState,useEffect } from "react";

const ItineraryContext = createContext();

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState(() => {
    const localData = localStorage.getItem('itinerary');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('itinerary', JSON.stringify(itinerary));
  }, [itinerary]);



	const addToItinerary = (hotel) => {
		setItinerary((prevItinerary) => {
			// Check if the hotel is already in the itinerary based on a unique identifier, such as hotel_id
			const isHotelAdded = prevItinerary.some(
				(item) => item.hotel_id === hotel.hotel_id
			);
			if (!isHotelAdded) {
				return [...prevItinerary, hotel];
			} else {
				// Optionally alert the user or handle as needed
				console.log("Hotel is already in the itinerary.");
				return prevItinerary;
			}
		});
	};

  const removeFromItinerary = (hotelId) => {
    setItinerary((prevItinerary) => prevItinerary.filter(hotel => hotel.hotel_id !== hotelId));
  };
  

	return (
		<ItineraryContext.Provider value={{ itinerary, addToItinerary ,removeFromItinerary}}>
			{children}
		</ItineraryContext.Provider>
	);
};
