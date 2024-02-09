import React from 'react'
import { Carousel } from 'flowbite-react';
import d6 from "../../assets/d6.jpg";
import d5 from "../../assets/d5.jpg";

const CarouselBanner = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={d6} alt="image1" className="w-full h-full object-fill" />
        <img src={d5} alt="image2" className="w-full h-full object-fill" />
      </Carousel>
    </div>
  );
}

export default CarouselBanner;