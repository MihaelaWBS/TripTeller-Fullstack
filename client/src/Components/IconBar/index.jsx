import { faComment, faShare, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import clap from "../../assets/icons8-clap-50.png";
import clapFilled from "../../assets/isClapped.png";
import comment from "../../assets/icons8-comment-50.png";
import share from "../../assets/icons8-right-2-50.png";
import menu from "../../assets/icons8-menu-48.png";
import heart from "../../assets/icons8-heart-50.png";
import heartFilled from "../../assets/likedPost.png";
import { Tooltip } from "flowbite-react";
import CommentSection from "../CommentSection";
import axios from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";

const index = () => {
  const [clapsCount, setClapsCount] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [postLike, setPostLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isClapped, setIsClapped] = useState(0);

  const { postId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        const post = response.data;
        console.log("Post data:", post);
        setIsLiked(post?.likedBy?.includes(user?._id));
        setLikesCount(post?.likes);
        setClapsCount(post?.claps);
      } catch (error) {
        console.error("Error fetching post details", error);
      }
    };

    fetchPostDetails();
  }, [postId, user?._id]);

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

  const toggleLikePost = async () => {
    if (!user) {
      console.error("User must be logged in to like a post");
      return;
    }

    try {
      const response = await axios.put(`/api/posts/${postId}/like`, {
        userId: user._id,
      });

      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error(
        "Error toggling like",
        error.response ? error.response.data : error
      );
    }
  };

  const addClap = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/clap`, { claps: 1 });
      setClapsCount((prevCount) => prevCount + 1);
      setIsClapped(true);
    } catch (error) {
      console.error(
        "Error adding clap",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      {isVisible && (
        <>
          <div className="fixed inset-x-0 bottom-0"></div>
          <div className="fixed inset-x-0 bottom-0 flex justify-center pb-4">
            <div className="flex justify-evenly  space-x-4 border-2 border-blue-200 max-w-xxs w-full p-2 rounded-full shadow-lg bg-white">
              <div>
                <Tooltip content="Like" placement="left">
                  <img
                    onClick={() => toggleLikePost(postId, user._id)}
                    src={isLiked ? heartFilled : heart}
                    className="h-10 w-10 rounded-3xl border-2 p-1.5 border-gray-300 text-blue-500 cursor-pointer"
                  />
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Clap" placement="left">
                  <div className="flex items-center">
                    <img
                      onClick={() => addClap(postId)}
                      src={isClapped ? clapFilled : clap}
                      className="h-10 w-10 rounded-3xl border-2 p-1.5 border-gray-300 text-blue-500 cursor-pointer"
                    />
                    <span className="ml-2">{clapsCount}</span>
                  </div>
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
                <Tooltip
                  content={
                    <div className="flex flex-col">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center px-2 py-1 hover:text-blue-600"
                      >
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="mr-2"
                          aria-hidden="true"
                        />
                        Facebook
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center px-2 py-1 hover:text-blue-600"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="mr-2"
                          aria-hidden="true"
                        />
                        LinkedIn
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center px-2 py-1 hover:text-blue-600"
                      >
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="mr-2"
                          aria-hidden="true"
                        />
                        Twitter
                      </a>
                    </div>
                  }
                  placement="top"
                >
                  <img
                    src={share}
                    className="h-10 w-10 text-blue-500 rounded-3xl border-2 p-1.5 border-gray-300 cursor-pointer"
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
