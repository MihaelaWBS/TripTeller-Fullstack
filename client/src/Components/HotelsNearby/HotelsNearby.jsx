import React, { useEffect, useState } from "react";
import { useSearch } from "../../Context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HotelCard from "../HotelCard/HotelCard";
import LoadingComponent from "../LoadingComponent/LoadingComponentNearbyCities/index";

const HotelsNearby = () => {
  const [loading, setLoading] = useState(false);

  const {
    setHotelsBerlin,
    hotelsBerlin,
    hotelsMunich,
    setHotelsFrankfurt,
    setHotelsMunich,
    hotelsFrankfurt,
    fetchHotelsByCity,
  } = useSearch();
  const [activeCity, setActiveCity] = useState("Berlin");

  const cities = {
    Berlin: {
      latitude: "52.5200",
      longitude: "13.4050",
      setHotels: setHotelsBerlin,
    },
    "Frankfurt am Main": {
      latitude: "50.1109",
      longitude: "8.6821",
      setHotels: setHotelsFrankfurt,
    },
    Munich: {
      latitude: "48.1351",
      longitude: "11.5820",
      setHotels: setHotelsMunich,
    },
  };

  useEffect(() => {
    Object.values(cities).forEach(({ latitude, longitude, setHotels }) => {
      fetchHotelsByCity(latitude, longitude, setHotels);
    });
  }, []);

  const handleCityChange = (city) => {
    const { latitude, longitude, setHotels } = cities[city];
    setActiveCity(city);
    fetchHotelsByCity(latitude, longitude, setHotels);
  };

  const activeHotels =
    activeCity === "Berlin"
      ? hotelsBerlin
      : activeCity === "Munich"
      ? hotelsMunich
      : hotelsFrankfurt;

  return (
    <>
      <div className="flex flex-col flex-wrap mt-6">
        <p className="text-2xl font-extrabold text-center mb-6">
          Featured hotels for you
        </p>
        <>
          <div className="flex space-x-4 mb-4 max-w-3xl mx-auto">
            {Object.keys(cities).map((city) => (
              <button
                key={city}
                className={`py-2 px-4 font-semibold ${
                  activeCity === city
                    ? "border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => handleCityChange(city)}
              >
                {city}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl mb-10">
              {loading ? (
                <div>Loading...</div>
              ) : (
                activeHotels &&
                activeHotels
                  .slice(0, 4)
                  .map((hotel) => (
                    <HotelCard key={hotel.hotel_id} hotel={hotel} />
                  ))
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default HotelsNearby;
