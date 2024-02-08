import React from "react";
import DraggableList from "../DraggableList/DraggableList";

const TravelItinerary = ({ activities, itineraryId }) => {
  return (
    <>
      <DraggableList activities={activities} itineraryId={itineraryId} />
    </>
  );
};

export default TravelItinerary;
