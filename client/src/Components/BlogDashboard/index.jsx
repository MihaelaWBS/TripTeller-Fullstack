import React from 'react';
import axios from '../../axiosInstance';
import { useState, useEffect } from 'react';
/*
import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_SERVER_BASE_URL, { transports: ['websocket'] }); */


const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/posts`)
      .then(res => setPosts(res.data))
      .catch(e => console.error(e));

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
    {/* Content area for cards */}
    <div className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, userId) => (
            <div key={userId} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img className="w-full" src={post.imageUrl} alt="Blog post" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <p className="text-gray-700 text-base">{post.content}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {post.avatar && (
                  <img src={post.avatar} alt="Avatar" className="w-20 rounded-full" />
                )}
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {post.firstName} {post.lastName} {/*Here, we would need the user name instead */}
                    </span>
                  </div>
                  {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {post.date}
                  </span> */}
                </div>
                {/*
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {post.readTime}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>

  </>
    
    
  );
};

export default BlogDashboard;
