import React, { useContext } from "react";
import axios from "../../axiosInstance";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import c4 from "../../assets/c4.jpg"
import DOMPurify from "dompurify";
import parse from "html-react-parser";


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
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={c4}
          alt="Travel"
          className="w-full h-full object-c"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold">Travel smarter</h1>
        </div>
      </div>

      {/* Title for latest posts */}
      <div className="my-8 flex justify-center ">
        <h2 className="text-4xl font-bold">Our latest posts</h2>
      </div>

      {/* Content area for cards */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(
            (
              post // Removed incorrect usage of `userId` here
            ) => (
              <Link to={`/blog/posts/${post._id}`} key={post._id}>
                {" "}
                {/* Key is moved here */}
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                  <img
                    className="h-60 w-full"
                    src={post.imageUrl}
                    alt="Blog post"
                  />
                  <div className="px-4 py-2">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    {post.avatar && (
                      <img
                        src={post.avatar}
                        alt="Avatar"
                        className="w-20 rounded-full"
                      />
                    )}
                    <div className="flex border-t-2  items-center">
                      <div className="flex flex-col  items-center">
                        <div className="flex  items-center gap-6">
                          <img
                            src={post.userId.avatar}
                            alt="profile-avatar"
                            style={{ width: "40px" }}
                          />
                          <div className="flex  flex-col">
                            <p className="font-bold text-center">
                              {post.userId.firstName} {post.userId.lastName}
                            </p>
                          </div>
                          <p className="px-2 border rounded-3xl bg-blue-200">
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