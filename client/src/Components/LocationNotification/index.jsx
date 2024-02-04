import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const LocationNotification = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if the user has previously decided to block location permission
    const locationPermissionBlocked =
      localStorage.getItem("locationPermission") === "blocked";

    // If permission is blocked, don't show the modal and exit early
    if (locationPermissionBlocked) {
      setVisible(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionGranted(true);
          setVisible(false);
        },
        (error) => {
          console.error("Location permission denied:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleBlock = () => {
    // Remember the user's decision to block location access
    localStorage.setItem("locationPermission", "blocked");
    setVisible(false);
  };

  return visible ? (
    <div className="fixed top-0 left-0  w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4 font-bold md:text-xl">
          Enhance Your Experience with Nearby Hotels{" "}
          <FontAwesomeIcon icon={faEarth} color="orange" />
        </p>
        <p className="mb-4 max-w-lg  md:text-xl">
          We use your location to help you find nearby hotels, improving your
          experience. Your privacy is respected and your data is not shared.
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setVisible(false); // Hide modal when button is clicked
            }}
            disabled={permissionGranted}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Allow
          </button>
          <button
            onClick={handleBlock}
            disabled={permissionGranted}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Block
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LocationNotification;
