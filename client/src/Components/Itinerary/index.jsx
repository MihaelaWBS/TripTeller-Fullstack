import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";
import { useItinerary } from "../../Context/ItineraryContext";

import { useParams } from "react-router-dom";

const Itinerary = () => {
	const { hotels } = useSearch();
	const [hotelDetails, setHotelDetails] = useState(null);
	const [error, setError] = useState(null);
	const { hotelId } = useParams();

	const { itinerary } = useItinerary();
	console.log("API Response or Itinerary Data:", itinerary); // Add this line to log the data

	return (
		<div>
			<h1>My Itinerary</h1>
			<div>
				{itinerary.length > 0 ? (
					itinerary.map((hotel, index) => (
						<div key={index}>
							<img
								className="w-1/3 object-cover"
								src={hotel.main_photo_url}
								style={{ width: "100px" }}
								alt="Hotel"
							/>
							<h2>{hotel.hotel_name}</h2>
							<h2>{hotel.city}</h2>
							<h2>{hotel.review_score}</h2>
							<div>
								<p className="text-xs text-gray-600">After tax & fees</p>
								<p className="text-lg font-extrabold text-red-500">
									{hotel.composite_price_breakdown.all_inclusive_amount.value}{" "}
									{
										hotel.composite_price_breakdown.all_inclusive_amount
											.currency
									}
								</p>
							</div>

							<h2>
								{" "}
								from {hotel.checkin.from} until {hotel.checkin.until}
							</h2>
						</div>
					))
				) : (
					<p>Your itinerary is empty.</p>
				)}
			</div>
		</div>
	);
};
export default Itinerary;
