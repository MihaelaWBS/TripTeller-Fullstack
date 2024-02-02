import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../../Context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  const { fetchNearbyCities } = useSearch();
  const [nearbyCities, setNearbyCities] = useState(null);
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [brokenImage, setBrokenImage] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const isScrolled = scrollRef.current.scrollLeft > 0;
      setShowLeftButton(isScrolled);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const fetchImage = async (cityName) => {
    const response = await fetch(
      `https://mihaelawbs-tripteller-fullstack-dev.onrender.com/api/photos/${cityName}`
    );
    const url = await response.json();

    // If the url is empty, return null
    if (!url || url === "") {
      return null;
    }

    return url;
  };
  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300 * 3, behavior: "smooth" });
    }
  };
  const scrollToPrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300 * 3, behavior: "smooth" });
    }
  };
  //potato
  useEffect(() => {
    console.log("useEffect called");

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Location fetched, now fetching cities...");

          const { latitude, longitude } = position.coords;
          try {
            const response = await fetchNearbyCities(latitude, longitude);
            const citiesWithImages = await Promise.all(
              response.data.map(async (city) => {
                const image = await fetchImage(city.name);
                return { ...city, image };
              })
            );
            setNearbyCities(citiesWithImages);
          } catch (error) {
            console.error("Error fetching nearby cities: ", error);
          }
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    };
    fetchData();
  }, []);
  return (
    <>
      {/*  MOBILE */}
      <div className="flex flex-col   mt-2 mx-2  font-extrabold sm:flex md:hidden">
        <p className="text-xl">Nearby cities</p>
        {nearbyCities &&
          nearbyCities.map((destination) => (
            <div className="max-w-xl w-full mx-auto mt-4 bg-white shadow-md rounded-lg  mb-4 flex  ">
              <div className="flex w-3/4">
                <img
                  className="w-1/3 object-cover h-24"
                  alt="Hotel"
                  src={destination.image || "https://via.placeholder.com/150"}
                />

                <div className=" p-4 flex flex-col  ">
                  <p className="flex font-bold"></p>
                  <div className="flex gap-2 items-center"></div>
                  <p className="text-sm text-black mt-1">{destination.name}</p>
                  <p className="text-sm text-gray-600 mt-1">500+ properties</p>

                  <div className="flex mt-2 flex-wrap"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* DESKTOP */}
      <div className="xxs:hidden md:block md:max-w-xl relative lg:max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-col   mt-2 lg:text-2xl font-extrabold">
          <p className="text-3xl text-center">Nearby cities</p>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrolling-touch justify-start card-scrollbar-container"
            style={{
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
          >
            {nearbyCities &&
              nearbyCities
                .sort((a, b) =>
                  a.usesPlaceholder === b.usesPlaceholder
                    ? 0
                    : a.usesPlaceholder
                    ? 1
                    : -1
                )
                .map((city, index) => (
                  <div
                    key={index}
                    className="flex-initial p-4"
                    style={{ width: "300px" }}
                  >
                    <div className="bg-white rounded-lg border shadow-md overflow-hidden">
                      <div
                        style={{
                          width: "300px",
                          height: "250px",
                          margin: "auto",
                        }}
                      >
                        <img
                          src={city.image}
                          alt={city.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300";
                            city.usesPlaceholder = true;
                            setBrokenImage(true); // Force a re-render
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-lg font-semibold">{city.name}</h5>
                        <p className="text-sm text-gray-600">
                          500+ accommodations
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {nearbyCities && nearbyCities.length > 3 && (
            <>
              {showLeftButton && (
                <button
                  onClick={scrollToPrevious}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg"
                  aria-label="Scroll left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 18l-6-6 6-6"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={scrollToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6l6 6-6 6"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default index;
