import React, { useEffect, useState } from "react";
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
import MyProfile from "../MyProfile";
import LocationNotification from "../LocationNotification";
import AddPost from "../AddPost";
import Dashboard from "../UpcomingTrips/Dashboard/Dashboard";

const Main = () => {
  return (
    <>
      <LocationNotification />
      <main className="flex flex-col flex-grow ">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/trips/itinerary" element={<Itinerary />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/blog" element={<BlogDashboard />} />
          <Route path="/blog/posts/:postId" element={<PostDescription />} />
          <Route path="/blog/post/addPost" element={<PostForm />} />
          <Route path="/myprofile/:userId" element={<MyProfile />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/upcomingtrips" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
