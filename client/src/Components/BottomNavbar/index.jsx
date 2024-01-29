import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWallet,
  faMapMarkedAlt,
  faUser,
  faSuitcase,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg md:hidden">
        <div className="flex justify-between items-center text-xs">
          <Link
            to="/trips/itinerary"
            className="flex flex-col items-center flex-grow"
          >
            <FontAwesomeIcon
              icon={faSuitcase}
              className="text-orange-500"
              size="2xl"
            />
            <span className="tab tab-home">Trips</span>
          </Link>
          <Link to="/blog" className="flex flex-col items-center flex-grow">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="text-orange-500"
              size="2xl"
            />
            <span className="tab tab-wallet">Blog</span>
          </Link>
          <button className="flex flex-col items-center flex-grow">
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              className="text-orange-500"
              size="2xl"
            />
            <span className="tab tab-map">Map</span>
          </button>
          <button className="flex flex-col items-center flex-grow">
            <FontAwesomeIcon
              icon={faUser}
              className="text-orange-500"
              size="2xl"
            />
            <span className="tab tab-profile">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default index;
