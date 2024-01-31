import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import axiosInstance from "../../axiosInstance";
const index = () => {
  const { user, setUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (e) => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      const response = await axiosInstance.post(
        `/test-cloudinary/${user._id}`,
        formData
      );

      setImageUrl(response.data.url);

      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.data.url ? response.data.url : prevUser.avatar,
      }));
    } catch (error) {
      console.error("A problem occurred with the axios operation: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 flex flex-col">
          {/* ... iterate over sidebar items */}
          <button className="text-gray-700 text-md mb-2 hover:bg-gray-200 p-2 rounded">
            My Profile
          </button>
          {/* Add other buttons for the rest of the sidebar items */}
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-white shadow-md rounded-md p-6 ml-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            <div className="flex items-center mb-4">
              <img
                className="rounded-full h-24 w-24 mr-4"
                src={user ? user.avatar : ""}
                alt="Profile"
              />
              <input type="file" onChange={handleFileChange} />
              <div>
                <h3 className="font-semibold text-lg">Rafiqur Rahman</h3>
                <p className="text-gray-600">Team Manager</p>
                <p className="text-gray-600">Leeds, United Kingdom</p>
              </div>
              <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p>First Name: Rafiqur</p>
                <p>Email address: rafiqurrahman51@gmail.com</p>
                <p>Bio: Team Manager</p>
              </div>
              <div>
                <p>Last Name: Rahman</p>
                <p>Phone: +09 345 346 46</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p>Country: United Kingdom</p>
                <p>Postal Code: ERT 2354</p>
              </div>
              <div>
                <p>City/State: Leeds, East London</p>
                <p>TAX ID: AS45645756</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
