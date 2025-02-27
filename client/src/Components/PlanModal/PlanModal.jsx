import React, { useState, useEffect } from "react";
import { useItinerary } from "../../Context/ItineraryContext";
import PlanForm from "../PlanForm/TravelItinerary";
import axiosInstance from "../../axiosInstance";

const PlanModal = ({ isOpen, onClose, itineraryId }) => {
  const { itinerary } = useItinerary();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      console.log("asdasd", itineraryId, isOpen);
      if (isOpen && itineraryId) {
        console.log("WHAT IS THIS", itineraryId);
        try {
          const response = await axiosInstance.get(
            `/api/activities/itinerary/${itineraryId}`
          );
          console.log("WHAAAA", response.data);
          setActivities(response.data);
        } catch (error) {
          console.error("Failed to fetch activities:", error);
          setActivities([]); // Reset activities on error or if the itinerary has no activities
        }
      }
    };

    fetchActivities();
  }, [isOpen, itineraryId]);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-500">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Plan your trip
                </h3>
                <div className="mt-2">
                  <PlanForm activities={activities} itineraryId={itineraryId} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-500">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
