import React, { useContext, useEffect, useState } from "react";
import { useItinerary } from "../../../Context/ItineraryContext";
import axiosInstance from "../../../axiosInstance";
import { AuthContext } from "../../../Context/Auth";
import TripList from "../TripsList/TripsList";

const Tab = ({ children, activeTab, setActiveTab }) => (
  <button
    className={`px-4 py-2 ${
      activeTab === children ? "border-b-2 border-blue-500" : ""
    }`}
    onClick={() => setActiveTab(children)}
  >
    {children}
  </button>
);

const Trips = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [cancelledTrips, setCancelledTrips] = useState([]);

  // Add this function inside your Trips component
  const fetchUpcomingTrips = async () => {
    if (user && user._id) {
      try {
        const response = await axiosInstance.get(
          `/api/upcomingTrips/user/${user._id}`
        );
        const nonCancelledTrips = response.data.filter(
          (trip) => trip.status !== "cancelled"
        );
        setUpcomingTrips(nonCancelledTrips);
      } catch (error) {
        console.log("Error fetching upcoming trips:", error);
      }
    }
  };

  const fetchCancelledTrips = async () => {
    if (user && user._id) {
      try {
        const response = await axiosInstance.get(
          `/api/upcomingTrips/cancelled/user/${user._id}`
        );
        setCancelledTrips(response.data);
      } catch (error) {
        console.log("Error fetching cancelled trips:", error);
      }
    }
  };

  useEffect(() => {
    fetchUpcomingTrips();
    fetchCancelledTrips();
  }, [user?._id]);

  const cancelTrip = (tripId) => {
    axiosInstance
      .put(`/api/upcomingTrips/cancel/${tripId}`)
      .then((res) => {
        setUpcomingTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripId)
        );
        setCancelledTrips((prevTrips) => [...prevTrips, res.data]);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="flex justify-evenly mb-4">
        <Tab activeTab={activeTab} setActiveTab={setActiveTab}>
          Upcoming
        </Tab>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab}>
          Cancelled
        </Tab>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab}>
          Completed
        </Tab>
      </div>
      <TripList
        activeTab={activeTab}
        upcomingTrips={upcomingTrips}
        cancelledTrips={cancelledTrips}
        cancelTrip={cancelTrip}
      />
    </div>
  );
};

export default Trips;
