import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const HotelCard = ({ hotel }) => {
  return (
    <div
      key={hotel.hotel_id}
      className="flex flex-col rounded overflow-hidden shadow-lg bg-white w-64"
    >
      <Link
        to={`/hotels/${hotel.hotel_id}`}
        className="flex flex-col cursor-pointer h-full"
      >
        <div className="flex-grow">
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={hotel.main_photo_url.replace("square60", "square500")}
              alt={hotel.hotel_name}
            />
            <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-bl">
              <span className="text-teal-500 font-bold">
                {hotel.review_score}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="font-bold text-sm mb-2">{hotel.hotel_name}</div>
            <div className="flex items-center mb-2">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faMapLocationDot} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${hotel.city}`,
                      "_blank"
                    );
                  }}
                  className="text-blue-500 font-bold"
                >
                  {hotel.city}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 rounded-b">
          <div className="text-gray-700 text-sm">After tax & fees</div>
          <div className="text-2xl font-extrabold text-red-500">
            {hotel.composite_price_breakdown.all_inclusive_amount.currency ===
            "EUR"
              ? "€"
              : hotel.composite_price_breakdown.all_inclusive_amount.currency}
            {parseFloat(
              hotel.composite_price_breakdown.all_inclusive_amount.value
            ).toFixed(0)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
