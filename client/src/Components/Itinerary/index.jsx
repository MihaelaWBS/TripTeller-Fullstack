import React from "react";
import { useItinerary } from "./ItineraryContext"; // Import the context hook

const Itinerary = () => {
  const { itinerary } = useItinerary(); // Use the context state

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-2 mt-4">
      <h2 className="text-center text-2xl font-bold">My Itinerary</h2>
      {/* ... sorting system here */}
      <div className="grid grid-cols-1 gap-4">
        {itinerary.map((hotel) => (
          <div key={hotel.hotel_id} className="card">
            {/* ... render your card here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;