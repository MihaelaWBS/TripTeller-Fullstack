import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { SearchProvider } from "./Context/SearchContext";

import { ItineraryProvider } from './ItineraryContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";

function App() {
  return (
    <>
      <SearchProvider>
        <div className="flex flex-col min-h-screen">
          <Header />

          <Main />
          <BottomNavbar />
          <Footer />
        </div>
      </SearchProvider>
    </>
  );

}

export default App;
