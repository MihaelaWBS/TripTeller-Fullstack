import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { HiHome } from "react-icons/hi";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

const TestShowPosts = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <>
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
    </>
  );
};

export default TestShowPosts;
