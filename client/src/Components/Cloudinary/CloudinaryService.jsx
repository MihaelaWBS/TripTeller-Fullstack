import React from "react";

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fehcsoxm");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwhicbo4t/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading the picture", error);
  }
};

export default uploadImageToCloudinary;
