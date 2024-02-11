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
      console.log(postId);
      await axiosInstance.delete(`/api/posts/${postId}`);
      navigate("/blog");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User:", user);
      console.log("Posts:", posts);
      axiosInstance
        .get(`/api/posts/user/${user._id}`)
        .then((res) => {
          console.log("Response:", res);
          setPosts(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);
  console.log(posts);
  return (
    <div className="max-w-4xl w-full mx-auto mt-10 flex flex-col">
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
          <p>Just some random text that will be added in the future!</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/myprofile">
            <Button className="bg-gray-200 text-black font-bold  rounded-3xl">
              Edit profile
            </Button>
          </Link>
          <Link to="/addPost">
            <Button className="bg-orange-500 rounded-3xl">Create a post</Button>
          </Link>
        </div>
      </div>
      <p className="md:text-2xl font-bold mt-10">Your Posts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        {posts.map((post) => (
          <div key={post._id} className="overflow-hidden mb-4">
            <div className=" py-5 grid grid-cols-4 gap-4 items-center">
              <div className="col-span-1">
                <img
                  src={post.imageUrl}
                  alt="Blog post"
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              <div className="col-span-3">
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  {post.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {post.userId &&
                      `${post.userId.firstName} ${post.userId.lastName}`}
                  </p>
                  <button
                    onClick={() => toggleMenu(post._id)}
                    className="text-gray-600 hover:text-gray-900 self-center"
                  >
                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {activeMenu === post._id && (
                    <div className="absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      {" "}
                      <ul className="py-1">
                        <li>
                          <Link
                            to={`/blog/posts/${post._id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit post
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => handleDelete(post._id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
