import React from 'react';
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import axiosInstance from "../../axiosInstance"
import { useHistory } from 'react-router-dom';

const PostDescription = () => {
  // Add any state or functions you need here
  const history = useHistory();
  const {id} = useParams()
  const [post, setPost] = useState(null);



  useEffect(() => {
    axiosInstance.get(`/api/posts/${id}`).then((response) => setPost(response.data)).catch((error) => console.log(error));
  
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/posts/${id}`);
      history.push('/'); // Redirect to home page after deleting
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };


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
      {post && 
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold my-4">{post.title}</h2>
      <img
        src={post.imageUrl} // Replace with your URL
        alt={post.title}
        className="w-full h-auto mb-4"
      />
      <p className="text-gray-700 mb-4">
        {/* Post content text */}
        {post.content}
      </p>

      {/* Action buttons */}
      <div className="flex gap-8">
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Update Post
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600" onClick={handleDelete}>
          Delete Post
        </button>
      </div>
      </div>
      }
      
    </>
  );
};

export default PostDescription;