import React, { useContext } from "react";
import LoadingNearbyCities from "../../../assets/nearby_cities_loading.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../../Context/Auth";

const index = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex mx-auto flex-col items-center xxs:mx-2">
      <Lottie
        animationData={LoadingNearbyCities}
        className="w-64 sm:w-96 md:w-[500px]"
      />
      <p className="font-bold md:text-2xl ">
        {user.firstName}, we're searching for hotels near you!
      </p>
    </div>
  );
};

export default index;
