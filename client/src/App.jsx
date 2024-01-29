import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import SearchResults from "./Components/SearchResults/SearchResults";
import { SearchProvider } from "./Context/SearchContext";
import { ItineraryProvider } from './ItineraryContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<ItineraryProvider>
			<SearchProvider>
				<Header />

				<Main />
				<Footer />
			</SearchProvider>
			</ItineraryProvider>
		</>

	);
}

export default App;
