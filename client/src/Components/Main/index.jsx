import React from "react";
import { Route, Routes } from "react-router-dom";
import Itinerary from "../Itinerary";
import UpcomingTrips from "../UpcomingTrips";
import Blog from "../Blog";
import Home from "../Home";

const Main = () => {
	return (
		<>
			<main>
				<Routes>
        <Route exact path="/" element={<Home />} />	
        <Route path="/trips/itinerary" element={<Itinerary />} />
					<Route path="/trips/upcoming" element={<UpcomingTrips />} />
					<Route path="/trips/blog" element={<Blog />} />
				</Routes>
			</main>
		</>
	);
};

export default Main;
