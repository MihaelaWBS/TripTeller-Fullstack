import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoadingComponent from "../Components/LoadingComponent/LoadingComponent";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [hotels, setHotels] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [sortOrder, setSortOrder] = useState("low-high");
  const [apiCallsCount, setApiCallsCount] = useState(0);
  const [adults, setAdults] = useState(1);
  const [childrenAge, setChildrenAge] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationSetByGeo, setLocationSetByGeo] = useState(false);

  const getCurrencyCode = async () => {
    const allowedCurrencyCodes = [
      "hotel_currency",
      "ARS",
      "AUD",
      "AZN",
      "BHD",
      "BRL",
      "BGN",
      "CAD",
      "CLP",
      "CNY",
      "COP",
      "CZK",
      "DKK",
      "EGP",
      "EUR",
      "FJD",
      "GEL",
      "HKD",
      "HUF",
      "INR",
      "IDR",
      "RON",
    ];

    try {
      const response = await axios.get(
        "https://api.ipgeolocation.io/ipgeo?apiKey=f57354baa9db47df9066106e23e91ffc"
      );
      const currencyCode = response.data.currency.code;
      console.log(`Currency code based on geolocation: ${currencyCode}`);

      if (allowedCurrencyCodes.includes(currencyCode)) {
        return currencyCode;
      } else {
        console.warn(
          `Currency code ${currencyCode} is not allowed. Defaulting to EUR.`
        );
        return "EUR";
      }
    } catch (error) {
      console.error(error);
      return "EUR";
    }
  };

  const fetchData = async () => {
    // Check if all required parameters are set
    if (!latitude || !longitude || !checkInDate || !checkOutDate) {
      return;
    }

    setIsLoading(true);

    const currencyCode = await getCurrencyCode();
    try {
      const response = await axios.get(
        `https://test-project-8zcp.onrender.com/api/hotels?latitude=${latitude}&longitude=${longitude}&search_type=CITY&arrival_date=${checkInDate}&departure_date=${checkOutDate}&adults=${adults}&children_age=${childrenAge}&room_qty=${rooms}&page_number=1&languagecode=en-us&currency_code=${currencyCode}`
      );

      setApiCallsCount((prevCount) => prevCount + 1);

      let hotelsData = response.data.data.result;

      // Sort the hotels based on sortOrder
      if (sortOrder === "low-high") {
        hotelsData.sort((a, b) => a.min_total_price - b.min_total_price);
      } else if (sortOrder === "high-low") {
        hotelsData.sort((a, b) => b.min_total_price - a.min_total_price);
      }

      setHotels(hotelsData);
    } catch (err) {
      setError(err);
      console.error("Error fetching hotels: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude && checkInDate && checkOutDate) {
      fetchData();
      navigate("/searchresults");
    } else {
      console.log("Please select both check-in and check-out dates.");
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleDateChange = (setter) => (e) => {
    console.log("Date changed");
    setter(e.target.value);
    /*     setShouldFetchOnDateChange(true);
     */
  };

  const displayLocation = () => {
    if (locationSetByGeo && latitude && longitude) {
      return "Near me"; // Change the return value to "Near me" when location is set by geolocation
    } else if (latitude && longitude) {
      return `Lat: ${latitude.toFixed(3)}, Long: ${longitude.toFixed(3)}`; // Retain this for cases where lat/long might be set manually or by other means
    }
    return "Where are you going?";
  };

  const fetchCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationSetByGeo(true); // Indicate that location is set via geolocation
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // NEARBY CITIES API! //

  const fetchNearbyCities = async (latitude, longitude) => {
    console.log("Fetching data...");
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getNearbyCities",
      params: {
        latitude: latitude,
        longitude: longitude,
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": "67e6b85d33mshd5e8a69a6d26d50p140b38jsn02c7a8bf3e37",
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  };

  /*   ACTIVATE THIS WHEN THE SITE IS FINISHED!
   */ /*  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchNearbyCities(position.coords.latitude, position.coords.longitude);
    });
  }, []); */
  // NEARBY CITIES API! //
  // ATTRACTIONS API! //
  const fetchAttractions = async () => {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?sort=",
      params: {
        id: "eyJ1ZmkiOi0yMDkyMTc0fQ==",
        page: "1",
        currency_code: "INR",
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": "67e6b85d33mshd5e8a69a6d26d50p140b38jsn02c7a8bf3e37",
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  // ATTRACTIONS API! //

  const value = {
    hotels,
    setHotels,
    isLoading,
    setIsLoading,
    error,
    setError,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    sortOrder,
    setSortOrder,
    apiCallsCount,
    setApiCallsCount,
    adults,
    setAdults,
    childrenAge,
    setChildrenAge,
    rooms,
    setRooms,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    fetchData,
    handleSubmit,
    displayLocation,
    fetchCoordinates,
    fetchNearbyCities,
    fetchAttractions,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
