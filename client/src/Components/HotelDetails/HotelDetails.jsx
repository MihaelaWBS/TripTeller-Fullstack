import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MapView from '../MapView/MapView';

const HotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [error, setError] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
          params: {
            hotel_id: hotelId,
            arrival_date: "2024-01-31",
            departure_date: "2024-02-02",
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
          // ... your axios request options
        };

        const response = await axios.request(options);
        if (response.data.status && response.data.data) {
          setHotelDetails(response.data.data);
          // Set initial active image, ensure this matches your data structure
          const initialImage = response.data.data.rooms[0]?.photos[0]?.url_original || '';
          setActiveImage(initialImage);
        } else {
          setError('Failed to fetch hotel details');
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (error) {
    return <div className="text-center text-red-600">Error loading hotel details.</div>;
  }

  if (!hotelDetails) {
    return <div className="text-center">Loading...</div>;
  }

  const roomsArray = Object.values(hotelDetails.rooms);
  const allPhotos = roomsArray.flatMap(room => room.photos.map(photo => photo.url_original));

  const sustainabilitySteps = hotelDetails.sustainability?.sustainability_page?.efforts?.map((effort, index) => (
    <li key={index}>{effort.title}: {effort.steps.join(", ")}</li>
  )) || <p>No sustainability data available.</p>;

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{hotelDetails.hotel_name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 max-w-2xl max-h-900px overflow-hidden">
          <img className="w-full h-auto rounded-lg shadow" src={activeImage} alt="Active Room" style={{ maxWidth: '900px', maxHeight: '900px' }} />
        </div>
        <div className="h-72 lg:h-auto">
          {hotelDetails && <MapView latitude={hotelDetails.latitude} longitude={hotelDetails.longitude} />}
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

      {/* Hotel Information */}
      <div className="hotel-info mb-8 p-6 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Hotel Information</h2>
        <p className="mb-2">{hotelDetails?.address}, {hotelDetails?.city}, {hotelDetails?.country_trans}</p>
        <p className="mb-2">Latitude: {hotelDetails?.latitude}, Longitude: {hotelDetails?.longitude}</p>
        <p className="mb-4">Check-in: {hotelDetails?.arrival_date}, Check-out: {hotelDetails?.departure_date}</p>
        <a href={hotelDetails?.url} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Visit Hotel Website</a>
        <p>Facilities: {hotelDetails?.family_facilities?.join(", ")}</p>
      </div>

      {/* Sustainability Efforts */}
      <div className="sustainability-info mb-8 p-6 bg-green-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Sustainability Efforts</h2>
        <ul className="list-disc list-inside">{sustainabilitySteps}</ul>
      </div>

      {/* COVID-19 Support */}
      <div className="covid-info mb-8 p-6 bg-red-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">COVID-19 Support</h2>
        {hotelDetails?.info_banners?.map((banner, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{banner.title}</p>
            <p>{banner.messages.join(" ")}</p>
          </div>
        )) || <p>No COVID-19 support information available.</p>}
      </div>
    </div>
  );
};

export default HotelDetails;
