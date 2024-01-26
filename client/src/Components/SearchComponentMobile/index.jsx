import React, { useEffect, useRef, useState } from "react";
/* import logo from "../../assets/bearLogo.png";
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from "../../Context/SearchContext";

import { useNavigate, Link } from "react-router-dom";

import {
  faEarth,
  faCalendar,
  faCableCar,
  faCheckCircle,
  faTimesCircle,
  faUser,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

/* import chevronRight from "../../";
import logoTravel from "./assets/logo-travel-2.png";
import hamburgerMenu from "./assets/icons8-hamburger-menu-48.png"; */

const index = () => {
  const {
    hotels,
    setHotels,
    isLoading,
    setIsLoading,
    error,
    setError,
    checkInDate,
    handleSubmit,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    sortOrder,
    setSortOrder,
    apiCallsCount,
    setApiCallsCount,
    adults,
    setAdults,
    childrenAge,
    setChildrenAge,
    rooms,
    setRooms,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    fetchData,
    displayLocation,
    fetchCoordinates,
  } = useSearch();
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const checkInInputRef = useRef(null);
  const navigate = useNavigate();
  const checkOutInputRef = useRef();
  const handleCityClick = (city) => {
    setSelectedCity(city);
    setIsCitiesModalOpen(false);
  };
  const toggleCitiesModal = () => {
    setIsCitiesModalOpen(!isCitiesModalOpen);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "Add dates";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="max-w-sm mx-auto mt-6">
          <div className="bg-white rounded-lg border shadow-md p-5 max-w-xs">
            <div className="flex flex-col space-y-4">
              <p>Destination</p>
              <div className="relative">
                <input
                  readOnly
                  value={displayLocation()}
                  className="w-full px-2 py-2 pl-4 border text-left rounded-md"
                  type="text"
                  placeholder="Where would you like to go?"
                />

                <FontAwesomeIcon
                  onClick={fetchCoordinates}
                  icon={faMapMarkerAlt}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  className="w-1/2 px-4 py-2 border rounded-md"
                  type="date"
                  name="checkin"
                  value={checkInDate}
                  ref={checkInInputRef}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
                <input
                  className="w-1/2 px-4 py-2 border rounded-md"
                  type="date"
                  name="checkout"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  value={checkOutDate}
                  ref={checkOutInputRef}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-1/3 px-4 py-2 border rounded-md"
                  type="number"
                  placeholder="1 Room"
                />
                <input
                  className="w-1/3 px-4 py-2 border rounded-md"
                  type="number"
                  placeholder="2 Adults"
                />
                <input
                  className="w-1/3 px-4 py-2 border rounded-md"
                  type="number"
                  placeholder="0 Children"
                />
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default index;
