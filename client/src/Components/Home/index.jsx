import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "../SearchComponent/index";
import TopDestinations from "../TopDestinations/index";

const index = () => {
  return (
    <>
      <SearchComponent />
      <TopDestinations />
    </>
  );
};

export default index;
