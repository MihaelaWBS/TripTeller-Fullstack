import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { HiHome } from "react-icons/hi";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

const PostDescription = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/posts/${postId}`);
      navigate("/"); // Redirect to home page after deleting
    } catch (error) {
      console.error("Failed to delete post:", error);
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
      {post && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold my-4">Title of the Post</h2>
          <img
            src="your-post-image-url.jpg" // Replace with your image URL
            alt="Post"
            className="w-full h-auto mb-4"
          />
          <div>
            {post.content && typeof post.content === "string" ? (
              <div className="tailwind-editor-content dark:text-white">
                {parse(DOMPurify.sanitize(post.content))}
              </div>
            ) : (
              <p>No content available</p>
            )}
            {/* <Button onClick={handleEditClick}>Edit Post</Button>
  <Button onClick={deletePost}>Delete post</Button> */}
          </div>
          <div>{post.title}</div>

          {/* Action buttons */}
          <div className="flex gap-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Update Post
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDescription;
