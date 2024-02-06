import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";
import { useItinerary } from "../../Context/ItineraryContext";
import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import c1 from "../../assets/c1.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../Context/Auth";
import emptyItineraryBackground from "../../assets/empty_itinerary_background.png";
const Itinerary = () => {
  const { user } = useContext(AuthContext);
  const { hotels } = useSearch();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();

  const { itinerary, setItinerary } = useItinerary();

  useEffect(() => {
    const fetchItinerary = async () => {
      if (user && user._id) {
        try {
          const response = await axiosInstance.get(
            `/api/itineraries/user/${user._id}`
          );
          setItinerary(response.data);
        } catch (error) {
          console.log("Error fetching itinerary:", error);
        }
      }
    };

    fetchItinerary();
  }, [user]);

  const removeFromItinerary = async (id) => {
    try {
      console.log("Removing itinerary with ID:", id);
      await axiosInstance.delete(`/api/itineraries/${id}`);

      setItinerary((currentItineraries) =>
        currentItineraries.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log("Error removing item from itinerary:", error);
    }
  };

  return (
    <>
      <div className="relative h-96 w-full overflow-hidden">
        <img src={c1} alt="Travel" className="w-full h-full" />
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold">Travel smarter</h1>
        </div>
      </div>
      <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          My Itinerary
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 ">
          {itinerary.length > 0 ? (
            itinerary.map((hotel) => {
              let imgSrc = hotel.hotelDetails?.main_photo_url;
              if (imgSrc) {
                imgSrc = imgSrc.replace("square60", "square500");
              } else {
                imgSrc = "default_image_url";
              }
              imgSrc = imgSrc.replace("square60", "square500");
              return (
                <div key={hotel?.hotel_id}>
                  <Card
                    className="mb-5 w-full sm:w-auto"
                    imgAlt="Property picture"
                    imgSrc={imgSrc}
                  >
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {hotel?.hotelDetails?.hotel_name}
                    </h2>
                    <p>{hotel?.hotelDetails?.city}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-extrabold  text-blue-600 dark:text-gray-700">
                        {hotel?.hotelDetails?.review_score}
                      </p>
                      <p className="text-lg font-extrabold  text-blue-600 dark:text-gray-700">
                        {hotel?.hotelDetails?.review_score_word}
                      </p>
                      <p>{hotel?.hotelDetails?.review_nr} reviews</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-extrabold text-red-500">
                        {" "}
                        from {hotel?.hotelDetails?.checkin?.from} until{" "}
                        {hotel?.hotelDetails?.checkin?.until}
                      </p>
                      <div className="flex mt-2 flex-wrap">
                        {hotel?.hotelDetails?.hotel_include_breakfast === 0 && (
                          <span className="bg-green-200 rounded-full px-3 py-1 ml-4 mr-2">
                            Breakfast
                          </span>
                        )}
                        {hotel?.hotelDetails?.has_free_parking && (
                          <span className="bg-gray-200 rounded-full px-3 py-1 ml-4 mr-2">
                            Free parking
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex mt-2 flex-wrap justify-around">
                      <Link
                        to={`/hotels/${hotel?.hotelDetails?.hotel_id}`}
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
                      <h2>
                        FOR ADDING ARRIVAL AND DEPARTURE DATE IN THE FUTURE SO
                        THAT THE USER CAN PLAN
                      </h2>
                      <h2>{hotel?.hotelDetails?.data?.arrival_date}</h2>
                      <h2>{hotel?.hotelDetails?.data?.departure_date}</h2>
                    </div>
                    <Button
                      onClick={() => removeFromItinerary(hotel._id)}
                      className="bg-orange-500 rounded-3xl"
                    >
                      Remove from itinerary
                    </Button>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="md:text-2xl">
                  {user?.firstName}, your itinerary is empty!
                </p>
                <img src={emptyItineraryBackground} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Itinerary;
