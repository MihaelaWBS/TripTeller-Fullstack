import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";
import { useItinerary } from "../../Context/ItineraryContext";
import { useParams } from "react-router-dom";
import { Button, Card, Tooltip } from "flowbite-react";
import c1 from "../../assets/c1.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../Context/Auth";
import emptyItineraryBackground from "../../assets/empty_itinerary_background.png";
import PlanModal from "../PlanModal/PlanModal";
import d6 from "../../assets/d6.jpg";
import { toast } from "react-toastify";
import ItinerarySidebar from "./ItinerarySidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPlane,
  faTasks,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Itinerary = () => {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [plan, setPlan] = useState(null);
  const [selectedItineraryId, setSelectedItineraryId] = useState(null);

  const { user } = useContext(AuthContext);
  const { hotels, setUpcomingTripsLength } = useSearch();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();
  const [itineraries, setItineraries] = useState([]);

  const { itinerary, setItinerary, addTrip } = useItinerary();
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (user && user._id) {
        try {
          const response = await axiosInstance.get(
            `/api/itineraries/user/${user._id}`
          );

          // Fetch activities for each itinerary
          const activitiesPromises = response.data.map((itinerary) =>
            axiosInstance.get(`/api/activities/itinerary/${itinerary._id}`)
          );
          const activitiesResponses = await Promise.all(activitiesPromises);
          const activitiesData = activitiesResponses.map((res) => res.data);

          // Add activities to each itinerary
          const itinerariesWithActivities = response.data.map(
            (itinerary, index) => ({
              ...itinerary,
              activities: activitiesData[index],
            })
          );

          setItinerary(itinerariesWithActivities);
          console.log(itinerariesWithActivities);
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

  const addToUpcomingTrips = async (hotelId) => {
    try {
      // Prepare the payload with hotelId. Ensure this matches the backend expectation.
      const payload = {
        hotelId: hotelId,
      };

      const response = await axiosInstance.post(
        "/api/upcomingTrips/add",
        payload
      );

      // Check for successful creation
      if (response.status === 201) {
        // If you want to immediately show the new trip in the UI,
        // you should use the response data since it contains the updated trip details.
        setUpcomingTrips((prevTrips) => [...prevTrips, response.data]);
        setUpcomingTripsLength((prevLength) => prevLength + 1);
      }
    } catch (error) {
      console.log("Error adding hotel to upcoming trips:", error);
    }
  };

  return (
    <>
      <div className="relative  md:h-[42rem] w-full overflow-hidden">
        <img src={d6} alt="Travel" className="w-full h-full object-fill" />
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-10 flex items-center justify-center">
          {/*<h1 className="text-black text-6xl font-bold">Travel smarter</h1> */}
        </div>
      </div>
      <div className="container mx-auto my-8 p-6   ">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center">
          My Itinerary
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/4" style={{ maxHeight: "51vh" }}>
            <ItinerarySidebar />
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 ">
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
                  <div key={hotel?.hotel_id} className="flex flex-col h-full">
                    <Card
                      className="mb-5  flex flex-col img-height dark:bg-gray-700 "
                      imgAlt="Property picture"
                      imgSrc={imgSrc}
                    >
                      <h2 className="text-2xl font-bold tracking-tight text-wrap text-gray-900 dark:text-white">
                        {hotel?.hotelDetails?.hotel_name}
                      </h2>
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faMapLocationDot} />
                        <a
                          onClick={(e) => e.stopPropagation()}
                          href={`https://www.google.com/maps/search/?api=1&query=${hotel.city}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 dark:text-blue-600  font-bold"
                        >
                          {hotel?.hotelDetails?.city}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-extrabold  text-blue-600 dark:text-white">
                          {hotel?.hotelDetails?.review_score}
                        </p>
                        <p className="text-lg font-extrabold  text-blue-600 dark:text-white">
                          {hotel?.hotelDetails?.review_score_word}
                        </p>
                        <p>{hotel?.hotelDetails?.review_nr} reviews</p>
                      </div>
                      <div className="flex">
                        <div className="flex gap-2">
                          {hotel?.hotelDetails?.hotel_include_breakfast ===
                            0 && (
                            <span className="bg-green-500 rounded-full px-3 py-1 text-white dark:text-black">
                              Breakfast
                            </span>
                          )}
                          {hotel?.hotelDetails?.has_free_parking && (
                            <span className="bg-gray-500 rounded-full px-3 py-1  text-white dark:text-black">
                              Free parking
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="flex mt-2 flex-wrap justify-between">
                          <Link
                            to={`/hotels/${hotel?.hotelDetails?.hotel_id}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-bold text-lg cursor-pointer mb-2"
                          >
                            See Details
                          </Link>
                          <a
                            className=" text-green-600 hover:text-green-800  dark:text-green-500 dark:hover:text-green-400 font-bold text-lg cursor-pointer mb-2"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              addToUpcomingTrips(hotel.hotelDetails.hotel_id);
                              toast.success("Added to upcoming trips!");
                            }}
                          >
                            Add to upcoming trips
                          </a>
                          {/*
                        <h2>
                          FOR ADDING ARRIVAL AND DEPARTURE DATE IN THE FUTURE SO
                          THAT THE USER CAN PLAN
                        </h2> */}
                          <div className="flex gap-8 flex-wrap items-center">
                            <h2 className="mb-2 text-sm">
                              Arrival:{" "}
                              {new Date(
                                hotel?.hotelDetails?.data?.arrival_date
                              ).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </h2>
                            <h2 className="mb-2 text-sm">
                              Departure:{" "}
                              {new Date(
                                hotel?.hotelDetails?.data?.departure_date
                              ).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </h2>
                          </div>
                        </div>
                        <div className="mt-auto flex justify-between w-full">
                          <Tooltip
                            content="Remove from itinerary"
                            placement="right"
                          >
                            <Button
                              onClick={() => removeFromItinerary(hotel._id)}
                              className="bg-red-500 rounded-xl mt-2 relative group"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Plan" placement="left">
                            <Button
                              onClick={() => {
                                setIsPlanModalOpen(true);

                                setSelectedItineraryId(hotel._id);
                              }}
                              className="bg-blue-500 rounded-xl  mt-2"
                            >
                              <FontAwesomeIcon icon={faTasks} />
                            </Button>
                          </Tooltip>
                          <PlanModal
                            isOpen={isPlanModalOpen}
                            onClose={() => {
                              setIsPlanModalOpen(false);
                              setSelectedItineraryId(null); // Reset selectedItineraryId when closing the modal
                            }}
                            itineraryId={selectedItineraryId} // Pass the selected itinerary ID to the modal
                          />
                        </div>
                      </div>
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
      </div>
    </>
  );
};
export default Itinerary;
