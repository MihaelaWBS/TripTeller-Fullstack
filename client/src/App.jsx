import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { SearchProvider } from "./Context/SearchContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import { useEffect } from "react";
import Itinerary from "./Components/Itinerary";
import { ItineraryProvider } from "./Context/ItineraryContext";

function App() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Set your state here to indicate that the user is logged in
    }
  }, []);
  return (
    <>
      <ItineraryProvider>


        <SearchProvider>
          <div className="flex flex-col min-h-screen">
            <Header />

            <Main />

            <BottomNavbar />
            <Footer />
          </div>
        </SearchProvider>

      </ItineraryProvider>
    </>
  );
}

export default App;
