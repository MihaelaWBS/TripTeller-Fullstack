import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import NearbyCities from "../NearbyCities/index";
import Attractions from "../Attractions/index";

const index = () => {
  return (
    <>
      <SearchComponent />
      <NearbyCities />
      {/*  <Attractions /> */}
    </>
  );
};

export default index;
