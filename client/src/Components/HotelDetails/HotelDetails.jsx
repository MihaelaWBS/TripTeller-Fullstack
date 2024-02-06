import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import MapView from "../MapView/MapView";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import WeatherComponent from "../WeatherComponent/WeatherComponent";
import { useSearch } from "../../Context/SearchContext";
import { useLocation } from "react-router-dom";
const HotelDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const arrival_date = queryParams.get("arrival_date");
  const departure_date = queryParams.get("departure_date");

  console.log(arrival_date, departure_date);

  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } =
    useSearch();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [error, setError] = useState(null);
  const { hotelId } = useParams();
  const [readMore, setReadMore] = useState(null);
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
      {/* Weather Component */}
      {hotelDetails && (
        <WeatherComponent
          latitude={hotelDetails.latitude}
          longitude={hotelDetails.longitude}
          cityName={hotelDetails.city} // Assuming 'city' is the correct field
        />
      )}
      {/* Cards Container */}
      <div className="flex flex-wrap -mx-2">
        {/* Hotel Information Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
          <Card className="flex flex-col h-full">
            <div className="p-6 bg-blue-100 rounded-lg flex-grow">
              <h2 className="text-xl font-semibold mb-4">Hotel Information</h2>
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
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Hotel Website
              </a>
              {readMore === "hotelInfo" && (
                <p>Facilities: {hotelDetails?.family_facilities?.join(", ")}</p>
              )}
              <button
                onClick={() => toggleReadMore("hotelInfo")}
                className="mt-auto text-blue-600 hover:text-blue-800 ml-6"
              >
                {readMore === "hotelInfo" ? "Read Less" : "Read More"}
              </button>
            </div>
          </Card>
        </div>

        {/* Sustainability Efforts Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
          <Card className="flex flex-col h-full">
            <div className="p-6 bg-green-100 rounded-lg flex-grow">
              <h2 className="text-xl font-semibold mb-4">
                Sustainability Efforts
              </h2>
              {readMore === "sustainability" ? (
                <ul className="list-disc list-inside mb-4">
                  {hotelDetails.sustainability?.sustainability_page?.efforts?.map(
                    (effort, index) => (
                      <li key={index}>
                        {effort.title}: {effort.steps.join(", ")}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  {hotelDetails.sustainability?.sustainability_page
                    ?.efforts?.[0]?.title ||
                    "Details on sustainability efforts"}
                </p>
              )}
              <button
                onClick={() => toggleReadMore("sustainability")}
                className="mt-auto text-green-600 hover:text-green-800"
              >
                {readMore === "sustainability" ? "Read Less" : "Read More"}
              </button>
            </div>
          </Card>
        </div>

        {/* COVID-19 Support Card */}
        <div className="px-2 mb-4 w-full md:w-1/3">
          <Card className="flex flex-col h-full">
            <div className="p-6 bg-red-100 rounded-lg flex-grow">
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
                  {hotelDetails.info_banners?.[0]?.title ||
                    "COVID-19 support information not available"}
                </p>
              )}
              <button
                onClick={() => toggleReadMore("covid")}
                className="mt-auto text-red-600 hover:text-red-800"
              >
                {readMore === "covid" ? "Read Less" : "Read More"}
              </button>
            </div>
          </Card>
        </div>
      </div>
      <div className="px-2 mb-4 w-full md:w-2/3">
        <Card className="flex flex-col h-full">
          <div className="p-6 bg-gray-100 rounded-lg flex-grow">
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    className="text-left w-full font-semibold text-gray-800"
                    onClick={() => toggleReadMore(`faq-${index}`)}
                  >
                    {faq.question}
                  </button>
                  {readMore === `faq-${index}` && (
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetails;
