import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import NearbyCities from "../NearbyCities/index";
import Attractions from "../Attractions/index";
import PostForm from "../PostForm";
import Itinerary from "../Itinerary";
import TellerAI from "../TellerAI";
import PlanForm from "../PlanForm/TravelItinerary";
import HeaderWeather from "../HeaderWeather/HeaderWeather";

const index = () => {
  return (
    <>
      <SearchComponent />
      {/* <PostForm /> */}

      <NearbyCities />
      <TellerAI />
      <HeaderWeather />
      {/* <PlanForm /> */}
      {/*  <Attractions /> */}
    </>
  );
};

export default index;
