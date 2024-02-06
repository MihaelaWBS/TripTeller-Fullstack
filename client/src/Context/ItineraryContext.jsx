import React, { createContext, useContext, useState } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = (hotel) => {
    setItinerary((prevItinerary) => [...prevItinerary, hotel]);
  };

  return (
    <ItineraryContext.Provider value={{ itinerary, addToItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};