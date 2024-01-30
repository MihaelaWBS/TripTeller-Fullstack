import React from "react";
import { Route, Routes } from "react-router-dom";
import Itinerary from "../Itinerary";
import Home from "../Home";
import SearchResults from "../SearchResults/SearchResults";
import HotelDetails from "../HotelDetails/HotelDetails";
import BlogDashboard from "../BlogDashboard";
import PostDescription from "../PostDescription";
import PostForm from "../PostForm";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const Main = () => {
  return (
    <>
      <main className="flex flex-col flex-grow ">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/trips/itinerary" element={<Itinerary />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/blog" element={<BlogDashboard />} />
          <Route path="/blog/posts/:postId" element={<PostDescription />} />
          <Route path="/blog/post/addPost" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
