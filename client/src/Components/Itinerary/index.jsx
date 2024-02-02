import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";
import { useItinerary } from "../../Context/ItineraryContext";
import { useParams } from "react-router-dom";
import { Card } from 'flowbite-react';
import c1 from "../../assets/c1.jpg";
import { Link } from 'react-router-dom'


const Itinerary = () => {
	const { hotels } = useSearch(); 
	const [hotelDetails, setHotelDetails] = useState(null);
	const [error, setError] = useState(null);
	const { hotelId } = useParams();

	const { itinerary } = useItinerary();
	console.log("API Response or Itinerary Data:", itinerary); // Add this line to log the data

	return (
		<>
		<div className="relative h-96 w-full overflow-hidden">
			<img
			src={c1}
			alt="Travel"
			className="w-full h-full"
			/>
			<div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-50 flex items-center justify-center">
			<h1 className="text-white text-6xl font-bold">Travel smarter</h1>
			</div>
      	</div>
		<div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg" >
			<h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">My Itinerary</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 ">
				{itinerary.length > 0 ? (
					itinerary.map((hotel) => (
					
						
						<div key={hotel.hotel_id} >
							<Card
								
								className="mb-5 w-full sm:w-auto"
								imgAlt="Property picture"
								imgSrc={hotel.main_photo_url}
								
								>
								<h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{hotel.hotel_name}
								</h2>
								<p>{hotel.city}</p>
								<div className="flex items-center space-x-2">
									<p className="text-lg font-extrabold  text-blue-600 dark:text-gray-700">
									{hotel.review_score}
									</p>
									<p className="text-lg font-extrabold  text-blue-600 dark:text-gray-700">{hotel.review_score_word}</p>
									<p>{hotel.review_nr} reviews</p>

								</div>
								<div className="flex items-center space-x-2">
									<p className="font-extrabold text-red-500">
										{" "}
										from {hotel.checkin.from} until {hotel.checkin.until}
									</p>
									<div className="flex mt-2 flex-wrap">
										{hotel.hotel_include_breakfast === 0 && (
											<span className="bg-green-200 rounded-full px-3 py-1 ml-4 mr-2">
											Breakfast
											</span>
										)}
										{hotel.has_free_parking && (
											<span className="bg-gray-200 rounded-full px-3 py-1 ml-4 mr-2">
											Free parking
											</span>
										)}
									</div>
									
								</div>
								<div className="flex mt-2 flex-wrap justify-around" >
									
										<Link
										to={`/hotels/${hotel.hotel_id}`}
										className="text-blue-600 hover:text-blue-800 font-bold text-lg cursor-pointer"
									
										>
										See Details
										</Link>

										<a
										className=" text-green-600 hover:text-green-800 font-bold text-lg cursor-pointer"
										target="_blank"
										rel="noopener noreferrer"
										>
										Add to Incoming trips
										</a>
							
								</div>

							</Card>
						</div>


					))
				) : (
					<p>Your itinerary is empty.</p>
				)}
			</div>
		</div>
		</>
	);
};
export default Itinerary;
