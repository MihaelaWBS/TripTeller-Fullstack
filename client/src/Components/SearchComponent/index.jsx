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
        <div className="flex items-center justify-around mt-8">
          <div className=" hidden sm:grid md:max-w-2xl lg:max-w-3xl  dark:bg-gray-800 dark:border-white  dark:border-[0.5px] bg-white shadow-xl p-4 rounded-3xl  ">
            <div className="flex space-x-8 flex-col sm:flex-row justify-around items-center ">
              <div className="group relative flex cursor-pointer flex-col gap-1 ">
                <div className="flex gap-2 items-center justify-between">
                  <FontAwesomeIcon
                    icon={faEarth}
                    className="text-black dark:text-white  "
                  />
                  <p className="font-bold" onClick={toggleCitiesModal}>
                    {selectedCity || "Destination"}
                  </p>
                  {/*    {isCitiesModalOpen && (
                    <div className="modal">
                      {citiesData.map((city, index) => (
                        <p key={index} onClick={() => handleCityClick(city)}>
                          {city}
                        </p>
                      ))}
                    </div>
                  )} */}

                  <FontAwesomeIcon
                    onClick={fetchCoordinates}
                    icon={faMapMarkerAlt}
                  />

                  <div className="gradient-line absolute inset-x-0 -top-4 h-1 bg-transparent rounded-sm scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left duration-300"></div>
                </div>
                <p className="text-gray-500">{displayLocation()}</p>
              </div>
              <div className="w-px bg-gray-300 h-full  dark:bg-blue-500"></div>
              <div className="group relative flex cursor-pointer gap-1 flex-col">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-black dark:text-white"
                  />
                  <p
                    onClick={() => checkInInputRef.current.focus()}
                    className="font-bold"
                  >
                    Check in
                  </p>

                  <div className="gradient-line absolute inset-x-0 -top-4 h-1 bg-transparent rounded-sm scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left duration-300"></div>
                </div>
                <p className="text-gray-500">{formatDate(checkInDate)}</p>
                <input
                  type="date"
                  ref={checkInInputRef}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                  }}
                />
              </div>
              <div className="w-px bg-gray-300 h-full dark:bg-blue-500"></div>
              <div className="group relative flex cursor-pointer gap-1 flex-col">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-black dark:text-white"
                  />
                  <p
                    onClick={() => checkOutInputRef.current.focus()}
                    className="font-bold"
                  >
                    Check out
                  </p>
                  <div className="gradient-line absolute inset-x-0 -top-4 h-1 bg-transparent rounded-sm scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left duration-300"></div>
                </div>
                <p className="text-gray-500">{formatDate(checkOutDate)}</p>
                <input
                  type="date"
                  ref={checkInInputRef}
                  value={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                  }}
                />
              </div>
              <div className="w-px bg-gray-300 h-full  dark:text-white  dark:bg-blue-500"></div>
              <div className="group relative flex cursor-pointer gap-1 flex-col">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-black dark:text-white"
                  />
                  <div onClick={toggleModal} className="flex flex-col">
                    <p className="text-gray-500">
                      {adults} adult{adults > 1 ? "s" : ""}
                    </p>
                    <p className="text-gray-500">
                      {rooms} room{rooms > 1 ? "s" : ""}
                    </p>
                  </div>
                  {isModalOpen && (
                    <div className="absolute top-20  -left-50  bg-white p-4">
                      <div>
                        <label>Rooms:</label>
                        <input
                          type="number"
                          value={rooms}
                          onChange={(e) => setRooms(e.target.value)}
                          min="1"
                        />
                      </div>
                      <div>
                        <label>Adults:</label>
                        <input
                          type="number"
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          min="1"
                        />
                      </div>
                      <div>
                        <label>Children:</label>
                        <input
                          type="number"
                          value={childrenAge}
                          onChange={(e) => setChildrenAge(e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                  <div className="gradient-line absolute inset-x-0 -top-4 h-1 bg-transparent rounded-sm scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left duration-300"></div>
                </div>
              </div>
              <button className="bg-orange-500  rounded-full h-12 w-12 flex items-center justify-center">
                <img alt="chevronright" style={{ width: "30px" }} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default index;
