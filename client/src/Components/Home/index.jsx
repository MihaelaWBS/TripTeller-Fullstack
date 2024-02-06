import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import NearbyCities from "../NearbyCities/index";
import Attractions from "../Attractions/index";
import PostForm from "../PostForm";
import Itinerary from "../Itinerary";
import TellerAI from "../TellerAI";

const index = () => {
  return (
    <>
      <SearchComponent />
      {/* <PostForm /> */}

      <NearbyCities />
      <TellerAI />

      {/*  <Attractions /> */}
    </>
  );
};

export default index;
