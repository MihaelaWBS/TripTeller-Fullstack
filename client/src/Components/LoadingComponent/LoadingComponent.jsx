import React from "react";
import passport from "../../assets/passport.json";
import Lottie from "lottie-react";

const LoadingComponent = () => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-auto h-1/2 md:h-auto">
          <div className="mb-4">
            <Lottie animationData={passport} className=" w-20 mx-auto" />
            <h2 className="text-lg font-semibold text-center text-orange-500">
              BEST TRIP GUARANTEE
            </h2>
          </div>
          <p className="text-gray-600 text-sm text-center mb-6">
            Be prepared for the best trip ever!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
