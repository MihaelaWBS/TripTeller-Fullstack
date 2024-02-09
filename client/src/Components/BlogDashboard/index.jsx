import React, { useContext } from "react";
import axios from "../../axiosInstance";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import d6 from "../../assets/d6.jpg";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

/*
import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_SERVER_BASE_URL, { transports: ['websocket'] }); */

const BlogDashboard = () => {
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/posts`)
      .then((res) => setPosts(res.data))
      .catch((e) => console.error(e));

    /* socket.on('postCreated', newPost => {
      setPosts(posts => [newPost, ...posts]);
    });
    return () => {
      //cleanup
      //disconnect
      socket.disconnect();
    }; */
  }, []);

  return (
    <>
      {/* Banner with a cover picture and overlay text */}
      <div className="relative  md:h-[42rem] w-full overflow-hidden">
        <img src={d6} alt="Travel" className="w-full h-full object-fill" />
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-10 flex items-center justify-center">
          {/*<h1 className="text-white text-6xl font-bold">Travel smarter</h1> */}
        </div>
      </div>

      {/* Title for latest posts */}
      <div className="container mx-auto p-4">
        <div className="my-8 text-center ">
          <h2 className="text-4xl font-bold">OUR LATEST POSTS</h2>
        </div>

        <div className="text-center mb-10 md:ml-1 xl:ml-10">
          <Link to="/addPost">
            <Button className="bg-orange-500 rounded-3xl">Create a post</Button>
          </Link>
        </div>
        {/* Content area for cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map(
            (
              post // Removed incorrect usage of `userId` here
            ) => (
              <Link
                to={`/blog/posts/${post._id}`}
                key={post._id}
                className="max-w-sm w-full mx-auto rounded overflow-hidden shadow-lg bg-white"
              >
                {" "}
                {/* Key is moved here */}
                <img
                  className="h-60 w-full"
                  src={post.imageUrl}
                  alt="Blog post"
                />
                <div className="px-4 py-2">
                  <div className="font-bold text-xl mb-2">{post.title}</div>
                </div>
                <div className="w-full border-t-2"></div>
                <div className="px-4 py-2 flex justify-between items-center">
                  {post.avatar && (
                    <img
                      src={post.avatar}
                      alt="Avatar"
                      className="w-20 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <div className="flex  items-center gap-6">
                      <img
                        src={post.userId?.avatar}
                        alt="profile-avatar"
                        className="rounded-3xl"
                        style={{ width: "40px" }}
                      />
                      <div className="flex  flex-col">
                        <p className="font-bold text-nowrap">
                          {post.userId &&
                            `${post.userId.firstName} ${post.userId.lastName}`}
                        </p>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faClock} />
                          <p>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDashboard;
