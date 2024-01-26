import React from "react";
import { Route, Routes } from "react-router-dom";
import Itinerary from "../Itinerary";
import UpcomingTrips from "../UpcomingTrips";
import Blog from "../Blog";
import Home from "../Home";
import SearchResults from "../SearchResults/SearchResults";
import HotelDetails from "../HotelDetails/HotelDetails";

const Main = () => {
  return (
    <>
      <main className="flex flex-col flex-grow div-test">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/trips/itinerary" element={<Itinerary />} />
          <Route path="/trips/upcoming" element={<UpcomingTrips />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/trips/blog" element={<Blog />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
