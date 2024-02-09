import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

const Flag = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("flag", file);

    try {
      const response = await axiosInstance.post(
        `/auth/users/${user._id}/flag`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update user state or context here with the new flag
      console.log("Flag uploaded:", response.data);
      // You might want to refresh the user's data or use a context/provider to update the UI
    } catch (error) {
      console.error("Error uploading flag:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Flag</button>
      </form>
    </div>
  );
};

export default Flag;
