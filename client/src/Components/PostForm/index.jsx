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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        {/* <input
          type="text"
          name="description"
          value={postData.description}
          onChange={handleChange}
          placeholder="description"
        /> */}

        <input
          type="file"
          name="picture_url"
          onChange={handleChange}
          placeholder="Upload Image"
        />

        <QuillEditor
          value={editorContent}
          onChange={setEditorContent}
          handleImageUpload={handleImageUpload}
        />

        <Button type="submit">SUBMIT</Button>
      </form>
      <div>
        <div className="tailwind-editor-content ">
          <div>{parse(editorContent)}</div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
