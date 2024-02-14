import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoadingComponent from "../Components/LoadingComponent/LoadingComponent";
import LoadingComponentNearbyCities from "../Components/LoadingComponent/LoadingComponentNearbyCities/index";
import { AuthContext } from "./Auth";
import axiosInstance from "../axiosInstance";
const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [upcomingTripsLength, setUpcomingTripsLength] = useState([]);

  const [hotels, setHotels] = useState(null);
  const [hotelsBerlin, setHotelsBerlin] = useState(null);
  const [hotelsMunich, setHotelsMunich] = useState(null);
  const [hotelsFrankfurt, setHotelsFrankfurt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNearbyCities, setIsLoadingNearbyCities] = useState(false);
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
  const [posts, setPosts] = useState([]);
  const [itinerary, setItinerary] = useState([]);
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
        "https://api.ipgeolocation.io/ipgeo?apiKey=a3b9ca377d7f4f37afbce441ac90e113"
      );
      const currencyCode = response.data.currency.code;

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

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const fetchNearbyHotelsBerlin = async () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkInDateBerlin = today.toISOString().split("T")[0];
    const checkOutDateBerlin = tomorrow.toISOString().split("T")[0];

    const adultsBerlin = 1;
    const roomsBerlin = 1;
    const childrenAge = []; // Set this to the appropriate value

    const currencyCode = await getCurrencyCode();
    try {
      const response = await axios.get(
        `https://test-project-8zcp.onrender.com/api/hotels?latitude=52.5200&longitude=13.4050&search_type=CITY&arrival_date=${checkInDateBerlin}&departure_date=${checkOutDateBerlin}&adults=${adultsBerlin}&children_age=${childrenAge}&room_qty=${roomsBerlin}&page_number=1&languagecode=en-us&currency_code=${currencyCode}`
      );

      let hotelsData = response.data.data.result;

      setHotelsBerlin(hotelsData);
    } catch (err) {
      setError(err);
      console.error("Error fetching hotels: ", err);
    }
  };

  useEffect(() => {
    fetchNearbyHotelsBerlin();
  }, []);

  const fetchNearbyHotelsMunich = async () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkInDateMunich = today.toISOString().split("T")[0];
    const checkOutDateMunich = tomorrow.toISOString().split("T")[0];

    const adultsMunich = 1;
    const roomsMunich = 1;
    const childrenAge = []; // Set this to the appropriate value

    const currencyCode = await getCurrencyCode();
    try {
      const response = await axios.get(
        `https://test-project-8zcp.onrender.com/api/hotels?latitude=52.5200&longitude=13.4050&search_type=CITY&arrival_date=${checkInDateMunich}&departure_date=${checkOutDateMunich}&adults=${adultsMunich}&children_age=${childrenAge}&room_qty=${roomsMunich}&page_number=1&languagecode=en-us&currency_code=${currencyCode}`
      );

      let hotelsData = response.data.data.result;

      setHotelsMunich(hotelsData);
    } catch (err) {
      setError(err);
      console.error("Error fetching hotels: ", err);
    }
  };

  useEffect(() => {
    fetchNearbyHotelsMunich();
  }, []);
  const fetchNearbyHotelsFrankfurt = async () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkInDateFrankfurt = today.toISOString().split("T")[0];
    const checkOutDateFrankfurt = tomorrow.toISOString().split("T")[0];

    const adultsFrankfurt = 1;
    const roomsFrankfurt = 1;
    const childrenAge = []; // Set this to the appropriate value

    const currencyCode = await getCurrencyCode();
    try {
      const response = await axios.get(
        `https://test-project-8zcp.onrender.com/api/hotels?latitude=52.5200&longitude=13.4050&search_type=CITY&arrival_date=${checkInDateFrankfurt}&departure_date=${checkOutDateFrankfurt}&adults=${adultsFrankfurt}&children_age=${childrenAge}&room_qty=${roomsFrankfurt}&page_number=1&languagecode=en-us&currency_code=${currencyCode}`
      );

      let hotelsData = response.data.data.result;

      setHotelsFrankfurt(hotelsData);
    } catch (err) {
      setError(err);
      console.error("Error fetching hotels: ", err);
    }
  };

  useEffect(() => {
    fetchNearbyHotelsFrankfurt();
  }, []);

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

  if (isLoadingNearbyCities) {
    return <LoadingComponentNearbyCities />;
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

  const fetchHotelsByCity = async (latitude, longitude, setHotelsFunction) => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const checkInDate = today.toISOString().split("T")[0];
    const checkOutDate = tomorrow.toISOString().split("T")[0];
    const adults = 1;
    const rooms = 1;
    const childrenAge = []; // Adjust as necessary

    const currencyCode = await getCurrencyCode(); // Ensure this function is defined and works
    try {
      const response = await axios.get(
        `https://test-project-8zcp.onrender.com/api/hotels?latitude=${latitude}&longitude=${longitude}&search_type=CITY&arrival_date=${checkInDate}&departure_date=${checkOutDate}&adults=${adults}&children_age=${childrenAge}&room_qty=${rooms}&page_number=1&languagecode=en-us&currency_code=${currencyCode}`
      );
      let hotelsData = response.data.data.result;
      setHotelsFunction(hotelsData); // Update the state with the fetched data
    } catch (err) {
      // Handle error
      console.error("Error fetching hotels: ", err);
    } finally {
      setIsLoadingNearbyCities(false); // Set loading to false after the fetch operation is done
    }
  };
  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/posts/user/${user._id}`)
        .then((res) => {
          setPosts(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/upcomingTrips/user/${user._id}`)
        .then((res) => {
          setUpcomingTripsLength(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/itineraries/user/${user._id}`)
        .then((res) => {
          setItinerary(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);
  // ATTRACTIONS API! //

  const value = {
    setUpcomingTrips,
    upcomingTrips,
    setItinerary,
    setPosts,
    itinerary,
    posts,
    hotels,
    setHotels,
    isLoading,
    setIsLoading,
    error,
    setError,
    fetchHotelsByCity,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    sortOrder,
    setSortOrder,
    hotelsMunich,
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
    setHotelsFrankfurt,
    hotelsFrankfurt,
    setHotelsBerlin,
    hotelsBerlin,
    setHotelsMunich,
    setHotelsFrankfurt,
    setHotelsBerlin,
    fetchAttractions,
    setUpcomingTripsLength,
    upcomingTripsLength,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
