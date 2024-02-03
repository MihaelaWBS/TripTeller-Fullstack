import { faComment, faShare, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import clap from "../../assets/icons8-clap-50.png";
import comment from "../../assets/icons8-comment-50.png";
import share from "../../assets/icons8-right-2-50.png";
import menu from "../../assets/icons8-menu-48.png";
import heart from "../../assets/icons8-heart-50.png";
import { Tooltip } from "flowbite-react";

const index = () => {
  return (
    <>
      <div className="flex justify-evenly mb-4 space-x-4 border-2 border-blue-200 max-w-xxs w-full mx-auto p-2 rounded-full shadow-lg">
        <div>
          <Tooltip content="Like" placement="left">
            <img
              src={heart}
              className="h-10 w-10 rounded-3xl border-2 p-1.5 border-gray-300 text-blue-500 cursor-pointer "
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip content="Clap" placement="left">
            <img
              src={clap}
              className="h-10 w-10 rounded-3xl border-2 p-1.5 border-gray-300 text-blue-500 cursor-pointer "
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip content="Comment" placement="left">
            <img
              src={comment}
              className="h-10 w-10 text-blue-500  rounded-3xl border-2 p-1.5 border-gray-300 cursor-pointer "
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip content="Share" placement="left">
            <img
              src={share}
              className="h-10 w-10 text-blue-500  rounded-3xl border-2 p-1.5 border-gray-300 cursor-pointer "
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default index;
