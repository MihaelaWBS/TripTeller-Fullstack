import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import { SearchProvider } from "./Context/SearchContext";
/*import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; */
import BottomNavbar from "./Components/BottomNavbar";
import React, { useState, useEffect } from "react";
/*import Itinerary from "./Components/Itinerary"; */
import { ItineraryProvider } from "./Context/ItineraryContext";
import Footer1 from "./Components/Footer1";
import axios from "axios";

function App() {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Set your state here to indicate that the user is logged in
    }
  }, []);

  /*

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/getDescriptionAndInfo'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint  
        setItinerary(response.data); // Assuming the data structure matches your context expectation
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); */


  return (
    <>
      <ItineraryProvider value={{ itinerary, setItinerary }}>


        <SearchProvider>
          <div className="flex flex-col min-h-screen">
            <Header />

            <Main />

            <BottomNavbar />
            <Footer1 />
          </div>
        </SearchProvider>

      </ItineraryProvider>
    </>
  );
}

export default App;
