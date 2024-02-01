import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { HiHome } from "react-icons/hi";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { AuthContext } from "../../Context/Auth";
const PostDescription = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(null);
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
      navigate("/blog"); // Redirect to blog page after deleting
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setUpdatedPost(post);
  };

  const handleInputChange = async (event) => {
    const { name, value, files } = event.target;

    if (name === "file") {
      const file = files[0];
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setUpdatedPost((prev) => ({ ...prev, picture_url: imageUrl }));
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    } else if (name === "isHot") {
      setUpdatedPost((prev) => ({ ...prev, [name]: event.target.checked }));
    } else {
      setUpdatedPost((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleContentChange = (content) => {
    setUpdatedPost({ ...updatedPost, content });
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/api/posts/${postId}`,
        updatedPost
      );
      if (response.status === 200) {
        setPost(response.data);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
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

      <div className="container mx-auto px-4 py-8">
        {editMode ? (
          <>
            <input
              type="text"
              name="title"
              value={updatedPost.title || ""}
              onChange={handleInputChange}
              placeholder="Post Title"
              className="mb-4 text-xl font-bold"
            />
            <ReactQuill
              theme="snow"
              value={updatedPost.content || ""}
              onChange={handleContentChange}
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={handleUpdateSubmit}
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold my-4">{post.title}</h2>
            {post.content && (
              <div
                className="tailwind-editor-content dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
              />
            )}
            <div className="flex gap-8 mt-4">
              {user && user._id === post.userId?._id && (
                <>
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    onClick={handleEditClick}
                  >
                    Edit Post
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostDescription;
