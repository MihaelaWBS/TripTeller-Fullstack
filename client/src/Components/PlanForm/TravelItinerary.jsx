import React from "react";
import DraggableList from "../DraggableList/DraggableList";

const TravelItinerary = ({ activities, itineraryId }) => {
  return (
    <>
      <div>TravelItinerary</div>
      <DraggableList activities={activities} itineraryId={itineraryId} />
    </>
  );
};

export default TravelItinerary;
