import { faComment, faShare, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import clap from "../../assets/icons8-clap-50.png";
import comment from "../../assets/icons8-comment-50.png";
import share from "../../assets/icons8-right-2-50.png";
import menu from "../../assets/icons8-menu-48.png";
import heart from "../../assets/icons8-heart-50.png";
import { Tooltip } from "flowbite-react";
import CommentSection from "../CommentSection";

const index = () => {
  const [openComment, setOpenComment] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleScroll = () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setLastScrollTop(st <= 0 ? 0 : st);
  };
  return (
    <>
      {isVisible && (
        <>
          <div className="fixed inset-x-0 bottom-0 h-[10vh] bg-white opacity-50"></div>
          <div className="fixed inset-x-0 bottom-0 flex justify-center pb-4">
            <div className="flex justify-evenly mb-4 space-x-4 border-2 border-blue-200 max-w-xxs w-full p-2 rounded-full shadow-lg bg-white">
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
                  <a href="#comments">
                    <img
                      onClick={() => setOpenComment(true)}
                      src={comment}
                      className="h-10 w-10 text-blue-500  rounded-3xl border-2 p-1.5 border-gray-300 cursor-pointer "
                    />
                  </a>
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
          </div>
        </>
      )}
      <div
        id="comments"
        className="flex items-center mx-auto justify-center max-w-2xl w-full"
      >
        <CommentSection />
      </div>
    </>
  );
};

export default index;
