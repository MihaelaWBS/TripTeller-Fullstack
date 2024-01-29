import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import SearchResults from "./Components/SearchResults/SearchResults";
import { SearchProvider } from "./Context/SearchContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <SearchProvider>
        <div className="flex flex-col min-h-screen">
          <Header />

          <Main />
          <Footer />
        </div>
      </SearchProvider>
    </>
  );
}

export default App;
