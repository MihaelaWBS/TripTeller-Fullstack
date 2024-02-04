import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import NearbyCities from "../NearbyCities/index";
import Attractions from "../Attractions/index";
import PostForm from "../PostForm";
import Itinerary from "../Itinerary";

const index = () => {
  return (
    <>
      <SearchComponent />
      {/* <PostForm /> */}

      <NearbyCities />

      {/*  <Attractions /> */}
    </>
  );
};

export default index;
