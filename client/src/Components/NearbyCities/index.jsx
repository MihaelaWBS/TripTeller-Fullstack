import React, { useEffect, useState } from "react";
import { useSearch } from "../../Context/SearchContext";

const index = () => {
  const { fetchNearbyCities } = useSearch();
  const [nearbyCities, setNearbyCities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
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

  const fetchImage = async (cityName) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&client_id=zQzuy7VqeYHfxnqB3JcH8zNW1F2VndGKqTMtft5sy4s`
    );
    const data = await response.json();
    return data.results[0]?.urls.small;
  };
  /* const destinations = [
    {
      name: "Kuala Lumpur",
      accommodations: 19902,
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Manila",
      accommodations: 13223,
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Penang",
      accommodations: 5161,
      image: "https://via.placeholder.com/250",
    },
    {
      name: "Penang",
      accommodations: 5161,
      image: "https://via.placeholder.com/250",
    },
  ]; */
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
      <div className="flex flex-col justify-center items-center mt-2 lg:text-2xl font-extrabold xxs:hidden md:flex ">
        <p className="text-3xl">Nearby cities</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4   scrolling-touch">
          {nearbyCities &&
            nearbyCities.map((destination, index) => (
              <div key={index} className="inline-block p-4">
                <div className="bg-white rounded-lg border shadow-md overflow-hidden">
                  <img
                    src={destination.image || "https://via.placeholder.com/150"}
                    alt={destination.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold">
                      {destination.name}
                    </h5>
                    {/*                     <p className="text-sm text-gray-600">{`${destination.accommodations.toLocaleString()} accommodations`}</p>
                     */}{" "}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default index;
