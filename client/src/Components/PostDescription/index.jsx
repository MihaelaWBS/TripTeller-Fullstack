import React from 'react';
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import axiosInstance from "../../axiosInstance"

const PostDescription = () => {
  // Add any state or functions you need here
  const [id] = useParams()
  const [post, setPost] = useState(null);


  return (
    <>
      {/* Banner with overlay */}
      <div className="relative h-[50rem] w-full">
        <img
          src="your-cover-image-url.jpg" // Replace with your image URL
          alt="Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">Travel Smarter</h1>
        </div>
      </div>

      {/* Post content area */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold my-4">Title of the Post</h2>
        <img
          src="your-post-image-url.jpg" // Replace with your image URL
          alt="Post"
          className="w-full h-auto mb-4"
        />
        <p className="text-gray-700 mb-4">
          {/* Post content text */}
          Your experience description goes here. This is the text where you can describe your experience.
        </p>

        {/* Action buttons */}
        <div className="flex gap-8">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Update Post
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Delete Post
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDescription;