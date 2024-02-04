import React, { useEffect, useRef, useState } from "react";
import chevronRight from "../../assets/icons8-right-50.png";
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
  faPlane,
  faUtensils,
  faCar,
  faLandmark,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";

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

  const StyledButton = ({ icon, children }) => (
    <Button className="rounded-3xl bg-orange-500">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
    </Button>
  );
  return (
    <>
      <div className="flex items-center flex-col justify-center div-test ">
        <div className="flex items-center justify-center mt-6 gap-2">
          <h2 className=" text-black font-bold xxs:text-base md:text-3xl">
            Book your trip and plan with us!
          </h2>
          <FontAwesomeIcon icon={faPlane} color="orange" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-around mt-8">
            <div className=" hidden sm:grid md:max-w-3xl lg:max-w-3xl dark:bg-gray-800 dark:border-white  dark:border-[0.5px] bg-white shadow-xl p-4 rounded-3xl  ">
              <div className="flex space-x-8 flex-col sm:flex-row justify-around items-center">
                <div className="group relative flex cursor-pointer flex-col gap-1">
                  <div className="flex gap-2 items-center justify-between ">
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
                  <p className="text-gray-500 text-center">
                    {displayLocation()}
                  </p>
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
                  <img
                    alt="chevronright"
                    src={chevronRight}
                    style={{ width: "30px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
        {/*   MOBILE ONLY!!!  */}
        <form onSubmit={handleSubmit} className="flex md:hidden">
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-lg border shadow-md p-5 max-w-xs">
              <div className="flex flex-col space-y-4">
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
                    value={checkOutDate}
                    ref={checkOutInputRef}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-1/2 px-4 py-2 border rounded-md"
                    type="date"
                    name="checkout"
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    className="w-1/3 px-4 py-2 border rounded-md"
                    type="number"
                    value={rooms}
                    placeholder="1 Room"
                    onChange={(e) => setRooms(e.target.value)}
                  />
                  <input
                    className="w-1/3 px-4 py-2 border rounded-md"
                    type="number"
                    value={adults}
                    placeholder="2 Adults"
                    onChange={(e) => setAdults(e.target.value)}
                  />
                  <input
                    className="w-1/3 px-4 py-2 border rounded-md"
                    type="number"
                    value={childrenAge}
                    placeholder="0 Children"
                    onChange={(e) => setChildrenAge(e.target.value)}
                  />
                </div>
                <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-blue-700">
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="lg:hidden">
        <div className="flex items-center mt-2">
          <div className="flex-grow h-0.5 bg-black"></div>
          <span className="px-4 md:text-3xl font-extrabold text-black dark:text-white">
            Explore more
          </span>
          <div className="flex-grow h-0.5 bg-black"></div>
        </div>
        <div className="flex gap-2 items-center justify-between mt-2  mx-2 overflow-auto">
          <StyledButton>
            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
            Restaurants
          </StyledButton>
          <StyledButton>
            <FontAwesomeIcon icon={faLandmark} className="mr-2" />
            Attractions
          </StyledButton>
          <StyledButton>
            <FontAwesomeIcon icon={faCar} className="mr-2" />
            Taxi
          </StyledButton>
          <StyledButton>
            <FontAwesomeIcon icon={faHotel} className="mr-2" />
            Hotels
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default index;
