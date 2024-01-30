import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import NearbyCities from "../NearbyCities/index";
import Attractions from "../Attractions/index";
import TestAddPage from "../TestAddPage";

const index = () => {
  return (
    <>
      <SearchComponent />
      {/*    <NearbyCities /> */}
      <TestAddPage />
      {/*  <Attractions /> */}
    </>
  );
};

export default index;
