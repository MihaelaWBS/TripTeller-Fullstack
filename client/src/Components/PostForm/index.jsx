import React, { useState } from "react";
import uploadImageToCloudinary from "../Cloudinary/CloudinaryService";
import QuillEditor from "../RichTextEditor/QuillEditor";
import parse from "html-react-parser";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import TextBlock from "../TextBlock";

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
    <>
      {/* TextBlock component will be the first element and centered on the page */}
      <div className="flex flex-col mt-40 items-center">
        <div className="w-full mb-20">
          <TextBlock />
        </div>

        {/* <div className="mt-10 w-full flex flex-col items-center "> */}
        <h1 className="text-center text-4xl font-bold mb-10 ">ADD YOUR POST</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3  w-full max-w-xl mx-auto"
        >
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="Title"
            // Use the full width within the max-w-xl container
            className="w-full p-4 border border-gray-300 rounded-md mb-3 dark:bg-gray-800 dark:placeholder:text-white "
          />

          <input
            type="file"
            name="picture_url"
            onChange={handleChange}
            placeholder="Upload Post Image"
            // Match the width with the title input within the max-w-xl container
            className="w-full p-2.5 border border-gray-300 rounded-md mb-3"
          />

          <div className="w-full max-w-xl mx-auto">
            <QuillEditor
              value={editorContent}
              onChange={setEditorContent}
              handleImageUpload={handleImageUpload}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="bg-orange-500 rounded-3xl mt-4 px-10 py-2 font-bold"
          >
            SUBMIT
          </Button>
        </form>

        <div className="tailwind-editor-content mt-5 w-full max-w-xl mx-auto ">
          <div>{parse(editorContent)}</div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
