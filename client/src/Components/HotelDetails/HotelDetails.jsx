import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import MapView from "../MapView/MapView";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import WeatherComponent from "../WeatherComponent/WeatherComponent";
import { useSearch } from "../../Context/SearchContext";
import backgroundImage from '../../Images/mountains.webp'
import  Modal  from "react-modal";
import freeParkingIcon from '../../Images/parking-svgrepo-com.svg';
import petFriendlyIcon from '../../Images/pet-shop-svgrepo-com.svg';
import poolIcon from '../../Images/pool-svgrepo-com.svg';
import restaurantIcon from '../../Images/restaurant-svgrepo-com.svg';
import spaIcon from '../../Images/spa-candle-svgrepo-com.svg';
import freeWifiIcon from '../../Images/wifi-svgrepo-com.svg';
import gymIcon from '../../Images/gym-svgrepo-com.svg';
import shuttleIcon from '../../Images/shuttle-svgrepo-com.svg'; // Ensure you have this icon
import familyRoomsIcon from '../../Images/family-3-generations-svgrepo-com.svg'; // Ensure you have this icon
import roomServiceIcon from '../../Images/room-service-service-svgrepo-com.svg'; // Ensure you have this icon
import defaultIcon from '../../Images/Animation - 1707483405053.gif';// Update the path to where your default icon is located

Modal.setAppElement("#root");
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`block w-full text-left px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-300 ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <svg
            className={`w-6 h-6 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div
        className={`transition-max-height duration-700 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border border-t-0 border-blue-200 bg-white px-5 py-3">
          <p className="text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
};

const HotelDetails = () => {
  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } =
    useSearch();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [error, setError] = useState(null);
  const { hotelId } = useParams();
  const [readMore, setReadMore] = useState(null);
  const [isPriceBreakdownModalOpen, setIsPriceBreakdownModalOpen] =
    useState(true);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [hotelHighlights, setHotelHighlights] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);

  const [faqs, setFaqs] = useState([
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is from 3 PM, and check-out is until 11 AM.",
    },
    {
      question: "Is parking available at the hotel?",
      answer: "Yes, the hotel offers free parking for guests.",
    },
    {
      question: "Do you offer free Wi-Fi?",
      answer: "Yes, free Wi-Fi is available throughout the hotel.",
    },
    {
      question: "Can I bring my pet?",
      answer:
        "Pets are welcome, with some restrictions. Please contact us for more details.",
    },
    {
      question: "Do you have a fitness center?",
      answer: "Yes, our fitness center is open to all guests 24/7.",
    },
    {
      question: "How can I cancel or modify my booking?",
      answer:
        "Please contact our customer service for cancellation or modification inquiries.",
    },
    {
      question: "Do you offer airport shuttle service?",
      answer:
        "Yes, we offer shuttle services to and from the airport. Additional charges may apply.",
    },
    {
      question: "Are there any restaurants on site?",
      answer:
        "Yes, we have multiple dining options available, ranging from casual to fine dining.",
    },
    {
      question: "Is breakfast included in the room rate?",
      answer:
        "Breakfast inclusion depends on the booking option selected. Please verify at the time of booking.",
    },
    {
      question:
        "What safety and hygiene measures are in place due to COVID-19?",
      answer:
        "We follow strict safety protocols, including enhanced cleaning, social distancing, and mandatory face masks in public areas.",
    },
    // Add more FAQs as needed
  ]);
  
  const checkInDateCookie = localStorage.getItem("checkInDate");
  const checkOutDateCookie = localStorage.getItem("checkOutDate");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
          params: {
            hotel_id: hotelId,
            arrival_date: checkInDateCookie,
            departure_date: checkOutDateCookie,
            adults: "1",
            children_age: "0",
            room_qty: "1",
            languagecode: "en-us",
            currency_code: "EUR",
          },
          headers: {
            "X-RapidAPI-Key":
              "67e6b85d33mshd5e8a69a6d26d50p140b38jsn02c7a8bf3e37",
            "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        console.log(response.data);
        if (response.data.status && response.data.data) {
          setHotelDetails(response.data.data);
          setSpokenLanguages(response.data.data.spoken_languages || []);
          setPriceBreakdown(response.data.data.product_price_breakdown || {});
          if (response.data.data && Array.isArray(response.data.data.facilities)) {
          const highlightsFromAPI = response.data.data.facilities.map(facility => {
            return {
              name: facility.name,
              icon: determineIcon(facility.name), // Implement this function based on your icon mapping
            };
          });
          setHotelHighlights(highlightsFromAPI);
          }
          const initialImage =
            (response.data.data.rooms &&
              response.data.data.rooms[0]?.photos[0]?.url_original) ||
            null;
          setActiveImage(initialImage);
        } else {
          setError("Failed to fetch hotel details");
        }
      } catch (error) {
        setError(error.toString());
        
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  useEffect(() => {
    if (hotelDetails && hotelDetails.rooms) {
      const roomsArray = Object.values(hotelDetails.rooms);
      const allPhotos = roomsArray.flatMap((room) => {
        // Debugging: Log to see if rooms have photos and what the structure looks like
        console.log("Room photos:", room.photos);
        return room.photos.map((photo) => photo.url_original);
      });
      const initialImage = allPhotos.length > 0 ? allPhotos[0] : null;
      setActiveImage(initialImage);

      // Debugging: Log all found photos
      console.log("All photos URLs:", allPhotos);
    }
  }, [hotelDetails]);

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading hotel details: {error}
      </div>
    );
  }

  if (!hotelDetails) {
    return (
      <>
        {" "}
        <LoadingComponent />
      </>
    );
  }

  let roomsArray = [];
  let allPhotos = [];
  if (hotelDetails && hotelDetails.rooms) {
    roomsArray = Object.values(hotelDetails.rooms);
    allPhotos = roomsArray.flatMap((room) =>
      room.photos.map((photo) => photo.url_original)
    );
  }

  const sustainabilitySteps =
    hotelDetails.sustainability?.sustainability_page?.efforts?.map(
      (effort, index) => (
        <li key={index}>
          {effort.title}: {effort.steps.join(", ")}
        </li>
      )
    ) || <p>No sustainability data available.</p>;

  const toggleReadMore = (section) => {
    setReadMore(readMore === section ? null : section);
  };
  const familyFacilitiesList =
    hotelDetails && hotelDetails.family_facilities
      ? hotelDetails.family_facilities.map((facility, index) => (
          <li key={index} className="list-disc list-inside">
            {facility}
          </li>
        ))
      : null;
  const languageMap = {
    mr: "Marathi",
    hi: "Hindi",
    "en-gb": "English (UK)",
    de: "German",
    es: "Spanish",
    fr: "French",
    it: "Italian",
    pt: "Portuguese",
    nl: "Dutch",
    ru: "Russian",
    pl: "Polish",
    da: "Danish",
    sv: "Swedish",
    no: "Norwegian",
    fi: "Finnish",
    cs: "Czech",
    el: "Greek",
    hu: "Hungarian",
    ro: "Romanian",
    sk: "Slovak",
    sl: "Slovenian",
    bg: "Bulgarian",
    lv: "Latvian",
    lt: "Lithuanian",
    et: "Estonian",
    hr: "Croatian",
    sr: "Serbian",
    mk: "Macedonian",
    bs: "Bosnian",
    al: "Albanian",
    is: "Icelandic",
    mt: "Maltese",
    ga: "Irish",
    cy: "Welsh",
    uk: "English",
    tr: "Turkish",
    "pt-pt": "Portuguese",
    az: "Azerbaijani",
  };
  function determineIcon(facilityIconName) {
    const iconMap = {
      "iconset/parking_sign": freeParkingIcon,
      "iconset/pawprint": petFriendlyIcon,
      "iconset/pool": poolIcon,
      "iconset/food": restaurantIcon,
      "iconset/spa": spaIcon,
      "iconset/wifi": freeWifiIcon,
      "iconset/fitness": gymIcon,
      "iconset/shuttle": shuttleIcon,
      "iconset/family": familyRoomsIcon,
      "iconset/gourmet": roomServiceIcon,
      // ... add all mappings here
    };
  
    return iconMap[facilityIconName] || defaultIcon; // Ensure defaultIcon is defined
  }
  
  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {hotelDetails.hotel_name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 max-w-2xl max-h-900px overflow-hidden">
          <img
            className="w-full h-auto rounded-lg shadow"
            src={activeImage}
            alt="Active Room"
            style={{ maxWidth: "700px", maxHeight: "470px" }}
          />
        </div>
        <div
          className="h-72 lg:h-auto"
          style={{ height: "400px", width: "400px" }}
        >
          {hotelDetails && (
            <MapView
              latitude={hotelDetails.latitude}
              longitude={hotelDetails.longitude}
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {allPhotos.map((photo, index) => (
          <img
            key={index}
            className="w-24 h-24 rounded-lg shadow cursor-pointer"
            src={photo}
            alt={`Room Photo ${index}`}
            onClick={() => setActiveImage(photo)}
          />
        ))}
      </div>

      {hotelDetails && (
        <WeatherComponent
          latitude={hotelDetails.latitude}
          longitude={hotelDetails.longitude}
          cityName={hotelDetails.city} // Assuming 'city' is the correct field
        />
      )}

      <div className="flex flex-wrap -mx-2">
        {/* Hotel Information Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
          <div className="relative">
            <div className="flex flex-col  h-full relative z-10">
              <div
                className="p-6 rounded-lg flex-grow relative z-10 text-white"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover", // Cover the entire area of the div
                  backgroundPosition: "center", // Center the background image
                  height: "350px", // Fixed height
                  width: "100%", // Fixed width (responsive within its grid column)
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black background with 50% opacity
                    padding: "10px", // Add padding to create some space around the text
                    borderRadius: "5px", // Optional: adds rounded corners
                  }}
                >
                  <h2 className="text-xl 	 font-semibold mb-4">
                    Hotel Information
                  </h2>
                  <p className="mb-2">
                    {hotelDetails?.address}, {hotelDetails?.city},{" "}
                    {hotelDetails?.country_trans}
                  </p>
                  <p className="mb-2">
                    Latitude: {hotelDetails?.latitude}, Longitude:{" "}
                    {hotelDetails?.longitude}
                  </p>
                  <p className="mb-4">
                    Check-in: {hotelDetails?.arrival_date}, Check-out:{" "}
                    {hotelDetails?.departure_date}
                  </p>
                  <a
                    href={hotelDetails?.url}
                    className="text-white-600 font-bold mt-6  hover:text-yellow-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Hotel Website
                  </a>
                  {readMore === "hotelInfo" && (
                    <p>
                      Facilities: {hotelDetails?.family_facilities?.join(", ")}
                    </p>
                  )}
                  <button
                    onClick={() => toggleReadMore("hotelInfo")}
                    className="mt-auto  text-white-600 font-bold mt-6 hover:text-blue-800 ml-6"
                  >
                    {readMore === "hotelInfo" ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isPriceBreakdownModalOpen}
          onRequestClose={() => setIsPriceBreakdownModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1000,
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #ccc",
              background: `url(${backgroundImage}) center/cover no-repeat, rgba(0, 0, 0, 0.5)`,
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "10px",
              outline: "none",
              padding: "20px",
              color: "white",
              width: "80%",
              maxWidth: "600px",
            },
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Price Breakdown
          </h2>
          {priceBreakdown && (
            <div style={{ lineHeight: "1.5" }}>
              <p>
                Gross Amount:{" "}
                <strong>
                  {priceBreakdown.gross_amount.currency}{" "}
                  {priceBreakdown.gross_amount.value.toFixed(2)}
                </strong>
              </p>
              <p>
                All Inclusive Amount:{" "}
                <strong>
                  {priceBreakdown.all_inclusive_amount.currency}{" "}
                  {priceBreakdown.all_inclusive_amount.value.toFixed(2)}
                </strong>
              </p>
              <p>
                Trip-teller Discount:{" "}
                <strong>
                  {priceBreakdown.excluded_amount.currency}{" "}
                  {priceBreakdown.excluded_amount.value.toFixed(2)}
                </strong>
              </p>
            </div>
          )}
          <button
            onClick={() => setIsPriceBreakdownModalOpen(false)}
            style={{
              display: "block",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "10px 20px",
              backgroundColor: "#007bff", // Button color
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close to View more
          </button>
        </Modal>
        {/* Spoken Languages Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
          <div className="relative">
            <div className="flex flex-col h-full relative z-10">
              <div
                className="p-6 rounded-lg flex-grow relative z-10 text-white"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "350px",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Spoken Languages
                  </h2>
                  <ul className="list-disc list-inside text-white">
                    {spokenLanguages.map((code, index) => (
                      <li key={index}>{languageMap[code] || code}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sustainability Efforts Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
  <div className="relative">
    <div className="flex flex-col h-full relative z-10">
      <div 
        className="p-6 rounded-lg flex-grow relative z-10 text-white" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Cover the entire area of the div
          backgroundPosition: 'center', // Center the background image
          height: '350px', // Fixed height
          width: '100%', // Fixed width (responsive within its grid column)
          overflow: 'auto',
       
       }}>
          <div 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
            padding: '10px', // Add padding to create some space around the text
            borderRadius: '5px', // Optional: adds rounded corners
          }}>
                <h2 className="text-xl font-semibold mb-4">Sustainability Efforts</h2>
                {readMore === "sustainability" ? (
                  <ul className="list-disc list-inside mb-4">
                    {hotelDetails.sustainability?.sustainability_page?.efforts?.map((effort, index) => (
<li key={index}>
{effort.title}: {effort.steps.join(", ")}
</li>
))
}
</ul>
) : (
<p>
{hotelDetails.sustainability?.sustainability_page?.efforts?.[0]?.title || "Details on sustainability efforts"}
</p>
)}
<button
onClick={() => toggleReadMore("sustainability")}
className="mt-auto text-white-600 font-bold mt-6 hover:text-green-800"
>
{readMore === "sustainability" ? "Read Less" : "Read More"}
</button>
</div>
</div>
</div>
</div>
</div>  {/* COVID-19 Support Card */}
<div className="px-2 mb-4 w-full md:w-1/3">
  <div className="relative">
    <div className="flex flex-col h-full relative z-10">
      <div 
        className="p-6 rounded-lg flex-grow relative z-10 text-white" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Cover the entire area of the div
          backgroundPosition: 'center', // Center the background image
          height: '350px', // Fixed height
          width: '100%', // Fixed width (responsive within its grid column)
          overflow: 'auto',
        }}>
          <div 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
            padding: '10px', // Add padding to create some space around the text
            borderRadius: '5px', // Optional: adds rounded corners
          }}>
          <h2 className="text-xl font-semibold mb-4">COVID-19 Support</h2>
          {readMore === "covid" ? (
            hotelDetails.info_banners?.map((banner, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{banner.title}</p>
                <p>{banner.messages.join(" ")}</p>
              </div>
            ))
          ) : (
            <p>
              {hotelDetails.info_banners?.[0]?.title || "COVID-19 support information not available"}
            </p>
          )}
          <button
            onClick={() => toggleReadMore("covid")}
            className="mt-auto text-white-600 font-bold mt-6 hover:text-red-800"
          >
            {readMore === "covid" ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  {/* Property Highlights Section */}
<div className="px-2 mb-4 w-full md:w-1/3">
  <div className="relative">
    <div className="flex flex-col h-full relative z-10">
      <div
        className="p-6 rounded-lg flex-grow relative z-10 text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Cover the entire area of the div
          backgroundPosition: 'center', // Center the background image
          height: '350px', // Fixed height
          width: '100%', // Fixed width (responsive within its grid column)
          overflow: 'auto',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
            padding: '10px', // Add padding to create some space around the text
            borderRadius: '5px', // Optional: adds rounded corners
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Property Highlights</h2>
          <div className="flex flex-wrap">
          {hotelHighlights.map((highlight, index) => (
    <div key={index} className="flex items-center m-2">
      <img src={highlight.icon} alt={highlight.name} className="w-6 h-6 mr-2" />
      <span>{highlight.name}</span>
    </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 {/* Family Facilities Card */}
 <div className="px-2 mb-4 w-full md:w-1/3">
  <div className="relative">
    <div className="flex flex-col h-full relative z-10">
      <div 
        className="p-6 rounded-lg flex-grow relative z-10 text-white" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Cover the entire area of the div
          backgroundPosition: 'center', // Center the background image
          height: '350px', // Fixed height
          width: '100%', // Fixed width (responsive within its grid column)
          overflow: 'auto',
       }}>
          <div 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
            padding: '10px', // Add padding to create some space around the text
            borderRadius: '5px', // Optional: adds rounded corners
          }}>
        <h2 className="text-xl font-semibold mb-4">Family Facilities</h2>
        <ul className="  mb-4">
          {readMore
            ? familyFacilitiesList.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))
            : familyFacilitiesList.slice(0, 5).map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
        </ul>
        {familyFacilitiesList.length > 5 && (
          <button
            onClick={() => setReadMore(!readMore)}
            className="mt-auto text-blue-600 hover:text-blue-800"
          >
            Read {readMore ? "Less" : "More"}
          </button>
        )}
      </div>
    </div>
  </div>
  </div>
</div>
</div>

      <div className="px-2 mb-4 w-full md:w-2/3">
        <Card className="flex flex-col h-full">
          <div className="my-8">
            <h2 className="text-3xl font-semibold mb-4">
              {" "}
              Frequently Asked Questions{" "}
            </h2>

            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                {faq.answer}
              </Accordion>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetails;
