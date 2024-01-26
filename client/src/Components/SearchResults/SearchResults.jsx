import React from "react";
import { useSearch } from "../../Context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBreadSlice,
	faEgg,
	faLocation,
	faMapLocationDot,
	faMarker,
	faParking,
	faTag,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const SearchResults = () => {
	const { hotels } = useSearch();
	return (
		<>
			<div className="max-w-3xl mx-auto flex flex-col gap-2 mt-4">
				<div className="flex p-4 border-2 rounded-xl justify-evenly ">
					<p>Sort</p>
					<p className="cursor-pointer">Lowest price</p>

					<p className="cursor-pointer">Highest price</p>
					<p className="cursor-pointer">Distance</p>
				</div>
			</div>

			{hotels &&
				hotels.slice(0, 2).map((hotel) => (
					<Link to={`/hotels/${hotel.hotel_id}`} key={hotel.hotel_id}>
						<div className="max-w-2xl mx-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden mb-4 flex xxs:hidden md:flex">
							{" "}
							<div className="flex w-3/4">
								<img
									className="w-1/3 object-cover"
									src={hotel.main_photo_url}
									alt="Hotel"
								/>

								<div className="w-2/3 p-4 flex flex-col  ">
									<p className="flex font-bold">
										{hotel.hotel_name || hotel.hotel_name_trans}
									</p>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faMapLocationDot} />
										<a
											href={`https://www.google.com/maps/search/?api=1&query=${hotel.city}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 font-bold"
										>
											{hotel.city}
										</a>
									</div>
									<p className="text-sm text-gray-600 mt-1">
										This property offers:
									</p>
									<div className="flex mt-2 flex-wrap">
										{hotel.hotel_include_breakfast === 0 && (
											<span className="bg-gray-200 rounded-full px-2 py-1 mr-2">
												Breakfast
											</span>
										)}
										{hotel.has_free_parking && (
											<span className="bg-gray-200 rounded-full px-3 py-1 mr-2">
												Free parking
											</span>
										)}
									</div>
								</div>
							</div>
							<div className="w-1/4 bg-blue-100 py-1 px-2 flex flex-col justify-between  ">
								<div className="text-center flex flex-col items-end">
									<div className="flex items-center justify-end gap-2">
										<p className="text-xs text-gray-600">
											{hotel.review_score_word}
										</p>
										<p className="flex items-center justify-center m bg-orange-500 text-white rounded-full w-8 h-8">
											{hotel.review_score}
										</p>
									</div>
									<p className="text-xs text-black">
										{hotel.review_nr} reviews
									</p>
								</div>
								<div className="text-center flex flex-col items-end">
									<p className="text-xs text-gray-600 ">After tax & fees</p>
									<p className="text-lg font-extrabold text-red-500">
										{hotel.composite_price_breakdown.all_inclusive_amount.value}{" "}
										{
											hotel.composite_price_breakdown.all_inclusive_amount
												.currency
										}
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}

			{hotels &&
				hotels.map((hotel) => (
					<Link to={`/hotels/${hotel.hotel_id}`} key={hotel.hotel_id}>
						<div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 md:hidden">
							{/* Image Section */}
							<div className="flex  justify-between">
								<img
									className="w-1/3 object-cover"
									src={hotel.main_photo_url}
									alt="Hotel"
								/>
								{/* Info Section */}
								<div className="w-2/3 p-4 flex flex-col item justify-between ">
									<div>
										<h3 className="text-lg font-semibold text-gray-800">
											{hotel.hotel_name}
										</h3>
										<p className="text-sm text-gray-600 gap-2 flex items-center">
											<FontAwesomeIcon icon={faMapLocationDot} />
											<a
												href={`https://www.google.com/maps/search/?api=1&query=${hotel.city}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-500 font-bold"
											>
												{hotel.city}
											</a>
										</p>
										<p className="text-sm text-gray-600 mt-2">
											This property offers:
										</p>
										<div className="text-sm text-gray-800 my-2">
											{hotel.hotel_include_breakfast === 0 && (
												<span className="bg-gray-200 rounded-full px-3 py-1 mr-2">
													Breakfast
												</span>
											)}
											{hotel.has_free_parking && (
												<span className="bg-gray-200 rounded-full px-3 py-1 mr-2">
													Free parking
												</span>
											)}

											{/*  <span className="bg-gray-200 rounded-full px-3 py-1">
                      Express check-in
                    </span> */}
										</div>
										{/* <p className="text-sm text-red-600 mt-1">
                    Liked! Last booked a minute ago for various dates
                  </p> */}
									</div>
									<div className="flex items-center justify-between mt-4">
										<p className="text-xs text-gray-600">Coupon applicable</p>
										<FontAwesomeIcon icon={faTag} className="text-blue-500" />
									</div>
								</div>
							</div>
							{/* Pricing Section */}
							<div className="bg-blue-100 p-4 flex justify-between items-center">
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
								<div className="text-right">
									<div className="flex items-center gap-2">
										<p className="text-xs text-gray-600">
											{hotel.review_score_word}
										</p>
										<p className="flex items-center justify-center bg-orange-500 text-white rounded-full w-8 h-8">
											{hotel.review_score}
										</p>
									</div>
									<p className="text-xs text-black">
										{hotel.review_nr} reviews
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
		</>
	);
};

export default SearchResults;
