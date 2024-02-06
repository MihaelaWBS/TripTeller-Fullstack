import React, { useState } from "react";
import uploadImageToCloudinary from "../Cloudinary/CloudinaryService";
import QuillEditor from "../RichTextEditor/QuillEditor";
import parse from "html-react-parser";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
const PostForm = () => {
  const [editorContent, setEditorContent] = useState("");
  const [postData, setPostData] = useState({ title: "", picture_url: "" });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "picture_url") {
      const file = e.target.files[0];
      setFile(file);
      handleImageUpload(file);

      setPostData({ ...postData, [e.target.name]: e.target.checked });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setPostData({ ...postData, picture_url: imageUrl });
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPostData = {
      title: postData.title,
      content: editorContent,
      imageUrl: postData.picture_url,
    };

    try {
      const response = await axiosInstance.post("/api/posts", finalPostData);
      console.log("response:", response);
      console.log("Post added", response.data);
      const postId = response.data._id;
      navigate(`/blog/posts/${postId}`);
    } catch (error) {
      if (error.response) {
        console.error("Failed to submit post", error.response.data);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="mt-40">
      <h1 className="text-center text-4xl font-bold mb-10">Add your post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full max-w-xl p-2 border border-gray-300 rounded-md"
        />
        {/* <input
          type="text"
          name="description"
          value={postData.description}
          onChange={handleChange}
          placeholder="description"
        /> */}
        <div className="flex items-center justify-between w-full max-w-xl">


        </div>
        <input
          type="file"
          name="picture_url"
          onChange={handleChange}
          placeholder="Upload Image"
          className="w-3/4 p-2 border border-gray-300 rounded-md"
        />

        <QuillEditor
          value={editorContent}
          onChange={setEditorContent}
          handleImageUpload={handleImageUpload}
          className="w-full max-w-xl"
        
        />

        <Button type="submit" className="bg-orange-500 rounded-3xl mt-2">SUBMIT</Button>
      </form>
      
      <div className="tailwind-editor-content mt-5 ">
          <div>{parse(editorContent)}</div>
      </div>
      
    </div>
  );
};

export default PostForm;
