import React from "react";

const TripList = ({ activeTab, upcomingTrips, cancelledTrips, cancelTrip }) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",

      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderTrip = (trip) => {
    let imgSrc = trip.hotelDetails?.main_photo_url;
    if (imgSrc) {
      imgSrc = imgSrc.replace("square60", "square500");
    } else {
      imgSrc = "default_image_url"; // replace with your actual default image URL
    }

    return (
      <div
        key={trip._id}
        className="bg-white shadow rounded-md overflow-hidden mb-4"
      >
        <div className="px-4 py-5 sm:px-6 grid grid-cols-4 gap-4 items-center">
          <div className="col-span-1">
            <img
              src={imgSrc}
              alt={trip.hotelDetails.hotel_name}
              className="w-full h-24 object-cover rounded-md"
            />
          </div>
          <div className="col-span-3">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              {trip.hotelDetails.hotel_name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {trip.hotelDetails.city}
            </p>
            <div className="mt-2 flex justify-between">
              <p className="text-sm text-gray-500">
                Check in: {formatDate(trip.hotelDetails.data.arrival_date)}
              </p>
              <p className="text-sm text-gray-500">
                Check out: {formatDate(trip.hotelDetails.data.departure_date)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-4 py-4 sm:px-6 border-t border-gray-200">
          <a
            href={trip.hotelDetails.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Manage booking
          </a>
          <button
            onClick={() => cancelTrip(trip._id)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => completeTrip(trip._id)}
            className="btn-secondary"
          >
            Completed
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {activeTab === "Upcoming" &&
        upcomingTrips.map((trip) => renderTrip(trip, "Upcoming"))}
      {activeTab === "Cancelled" &&
        cancelledTrips.map((trip) => renderTrip(trip, "Cancelled"))}
    </div>
  );
};

export default TripList;
