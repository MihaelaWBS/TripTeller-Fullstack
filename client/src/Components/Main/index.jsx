import React from "react";
/* import { Route, Routes } from "react-router-dom";
import Itinerary from "../Itinerary";
import UpcomingTrips from "../UpcomingTrips";
import Blog from "../Blog"; */

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
          <Route path="/myprofile/:userId" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
