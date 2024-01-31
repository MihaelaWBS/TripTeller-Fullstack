import React, { useEffect, useRef, useState } from "react";
import chevronRight from "../../assets/icons8-right-50.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from "../../Context/SearchContext";
import { useItinerary } from "../../Context/ItineraryContext"; // Import the context hook
import { useNavigate, Link } from "react-router-dom";



const Itinerary = () => {
  const { itinerary } = useItinerary(); // Use the context state
  const { hotels, attractions, restaurants } = useSearch();
  const [filter, setFilter] = useState('all'); // 'all', 'hotels', 'restaurants', 'attractions'

   // Filter change handler (2)
   const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Render items based on the selected filter (3)
  const renderItems = () => {
    let items = [];
    if (filter === 'all' || filter === 'hotels') {
      items = items.concat(hotels.slice(0, 2));
    }
    if (filter === 'all' || filter === 'restaurants') {
      items = items.concat(restaurants.slice(0, 2));
    }
    if (filter === 'all' || filter === 'attractions') {
      items = items.concat(attractions.slice(0, 2));
    }

	   //or - the alternative to: Render items based on the selected filter (lines 21-31)
	   /*
	   const renderItems = () => {
		let items = [];
		if (filter === 'all' || filter === 'hotels') {
		  items = items.concat(hotels.slice(0, 2).map(hotel => ({ ...hotel, type: 'hotel' })));
		}
		if (filter === 'all' || filter === 'restaurants') {
		  items = items.concat(restaurants.slice(0, 2).map(restaurant => ({ ...restaurant, type: 'restaurant' })));
		}
		if (filter === 'all' || filter === 'attractions') {
		  items = items.concat(attractions.slice(0, 2).map(attraction => ({ ...attraction, type: 'attraction' })));
		}  */

	// Render each item based on its type

	 return items.map((item) => {
		if (item.type === 'hotel') {
		  return (
			<Link to={`/hotels/${item.hotel_id}`} key={item.hotel_id}>
			  <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={item.main_photo_url} alt="Hotel" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{item.hotel_name}</div>
							<p className="text-gray-700 text-base">{item.hotel_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{item.hotel_address}</span>
							<span className="inline-block">{item.hotel_phone}</span>
						</div>
					</div>
			</Link>
		  );
		} else if (item.type === 'restaurant') {
		  return (
			<Link to={`/restaurants/${item.restaurant_id}`} key={item.restaurant_id}>
			  <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={item.main_photo_url} alt="Restaurant" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{item.restaurant_name}</div>
							<p className="text-gray-700 text-base">{item.restaurant_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{item.restaurant_address}</span>
							<span className="inline-block">{item.restaurant_phone}</span>
						</div>
					</div>
			</Link>
		  );
		} else if (item.type === 'attraction') {
		  return (
			<Link to={`/attractions/${item.attraction_id}`} key={item.attraction_id}>
			  <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={item.main_photo_url} alt="Attraction" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{item.attraction_name}</div>
							<p className="text-gray-700 text-base">{item.attraction_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{item.attraction_address}</span>
							<span className="inline-block">{item.attraction_phone}</span>
						</div>
					</div>
			</Link>
		  );
		}
	  });
	};

	return (
		<>
		  {/* Filter selection UI */}
		  <div className="flex flex-col gap-2 max-w-sm">
			<div className="flex p-4 border-2 rounded-xl justify-evenly ">
			  <select
				className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				onChange={handleFilterChange}
			  >
				<option value="all">All</option>
				<option value="hotels">Hotels</option>
				<option value="restaurants">Restaurants</option>
				<option value="attractions">Attractions</option>
			  </select>
			</div>
		  </div>
	
		  <h2 className="text-center text-2xl font-bold">My Itinerary</h2>
	
		  {renderItems()}
		</>
	  );
	};
	
	export default Itinerary;



	/*
	return (
		<>

			
			<h2 className="text-center text-2xl font-bold">My Itinerary</h2>

			{hotels &&
                hotels.slice(0, 2).map((hotel) => (
				<Link to={`/hotels/${hotel.hotel_id}`} key={hotel.hotel_id}>
					<div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={hotel.main_photo_url} alt="Hotel" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{hotel.hotel_name}</div>
							<p className="text-gray-700 text-base">{hotel.hotel_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{hotel.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{hotel.hotel_address}</span>
							<span className="inline-block">{hotel.hotel_phone}</span>
						</div>
					</div>
				</Link>
            ))}

			{restaurants &&
                restaurants.slice(0, 2).map((restaurant) => (
				<Link to={`/restaurants/${restaurant.restaurant_id}`} key={restaurant.restaurant_id}>
					<div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={restaurant.main_photo_url} alt="Restaurant" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{restaurant.restaurant_name}</div>
							<p className="text-gray-700 text-base">{restaurant.restaurant_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{restaurant.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{restaurant.restaurant_address}</span>
							<span className="inline-block">{restaurant.restaurant_phone}</span>
						</div>
					</div>
				</Link>
            ))}

			{attractions &&
                attractions.slice(0, 2).map((attraction) => (
				<Link to={`/attractions/${attraction.attraction_id}`} key={attraction.attraction_id}>
					<div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-5">
						<img className="w-full h-48 object-cover" src={restaurant.main_photo_url} alt="Attraction" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{attraction.attraction_name}</div>
							<p className="text-gray-700 text-base">{attraction.attraction_description}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{attraction.review_score} Stars</span>
						</div>
						<div className="px-6 pt-4 pb-2 flex justify-between items-center">
							<span className="inline-block">{attraction.attraction_address}</span>
							<span className="inline-block">{attraction.attraction_phone}</span>
						</div>
					</div>
				</Link>
            ))}							

		</>
	);

	*/