import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import { Link, useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faEllipsisV,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const toggleMenu = (postId) => {
    if (activeMenu === postId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(postId);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/api/posts/${postId}`);
      navigate("/blog");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/posts/user/${user._id}`)
        .then((res) => {
          console.log("Response:", res);
          setPosts(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 flex flex-col px-8 md:px-4">
      <div className="flex items-center gap-10">
        <div className="relative inline-block">
          <img
            className="rounded-full h-24 w-24 object-cover"
            src={user && user.avatar ? user.avatar : "default_avatar_path"}
            alt="Profile"
          />
          {user && user.flag && (
            <i
              className={` fi-${user.flag} absolute -right-2 top-1/2 transform -translate-y-1/2 h-5 w-7`}
              style={{ height: "1.1rem", width: "1.5rem" }}
              title={`${user.flag.toUpperCase()} flag`}
            ></i>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-bold text-xl">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </p>
          <p className="text-gray-600 dark:text-white">
            {user?.nickname || "Your nickname"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/myprofile">
            <Button className="bg-gray-200 text-black font-bold  rounded-3xl dark:text-white">
              Edit profile
            </Button>
          </Link>
          <Link to="/addPost">
            <Button className="bg-orange-500 rounded-3xl">Create a post</Button>
          </Link>
        </div>
      </div>
      <p className="md:text-2xl font-bold mt-10 mb-5 md:mb-10">Your Posts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className={`overflow-hidden dark:bg-gray-700 ${
              activeMenu === post._id ? "mb-8" : "mb-4"
            }`}
          >
            <div className="py-5  grid grid-cols-1 gap-4 items-center relative ">
              <div className="col-span-1">
                <img
                  src={post.imageUrl}
                  alt="Blog post"
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              <div className="relative">
                <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-white ml-2">
                  {post.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-white ml-2">
                    {post.userId &&
                      `${post.userId.firstName} ${post.userId.lastName}`}
                  </p>
                  <button
                    onClick={() => toggleMenu(post._id)}
                    className="text-gray-600 hover:text-gray-900 self-end dark:text-white"
                  >
                    <FontAwesomeIcon icon={faEllipsis} className="pr-4" />{" "}
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-white ml-2">
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {activeMenu === post._id && (
                    <div
                      className="absolute z-10 left-0 mt-2 w-full md:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-700"
                      style={{ transform: "translateX(-50%)", left: "50%" }}
                    >
                      <ul className="py-1">
                        <li>
                          <Link
                            to={`/blog/posts/${post._id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-white dark:hover:bg-gray-500 dark:hover:text-white"
                          >
                            Edit post
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleDelete(post._id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-white dark:hover:bg-gray-500 dark:hover:text-white"
                          >
                            Delete post
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
