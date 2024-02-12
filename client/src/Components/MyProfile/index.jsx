import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import FlagPickerModal from "../FlagPickerModal/FlagPickerModal";
import NicknameModal from "../NicknameModal/NicknameModal";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const index = () => {
  const { user, setUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post(
        `/auth/users/${user._id}/avatar`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error uploading avatar:", error);
    }
  };

  return (
    <div className="xxs:max-w-sm md:max-w-7xl w-full mx-auto p-8 ">
      <div className="flex xxs:flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-64 flex flex-col">
          {/* ... iterate over sidebar items */}
          <button className="text-blue-500 text-md mb-2 font-bold bg-blue-100 hover:bg-gray-200 p-2 rounded-3xl">
            My Profile
          </button>
          <button className="text-blue-500 text-md mb-2 font-bold hover:bg-gray-200 p-2 rounded-3xl">
            Security
          </button>
          <button className="text-red-500 text-md mb-2 hover:bg-gray-200 p-2 rounded-3xl">
            Delete account
          </button>
          {/* Add other buttons for the rest of the sidebar items */}
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-white shadow-2xl rounded-md p-6 ml-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            <div className="flex flex-wrap items-center mb-4 space-x-4">
              <div className="relative inline-block">
                <img
                  className="rounded-full h-24 w-24 object-cover"
                  src={
                    user && user.avatar ? user.avatar : "default_avatar_path"
                  }
                  alt="Profile"
                />
                {user && user.flag && (
                  <i
                    className={` fi-${user.flag} absolute -right-2 top-1/2 transform -translate-y-1/2 h-5 w-7`}
                    style={{ height: "1.1rem", width: "1.5rem" }}
                    title={`${user.flag.toUpperCase()} flag`}
                  ></i>
                )}
              </div>

              {/* User Info */}
              <div>
                <div className="flex-grow mb-4">
                  {" "}
                  {/* Added margin-bottom for spacing */}
                  <p className="font-bold text-xl">
                    {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-gray-600">
                      {user?.nickname || "YourNickname"}
                    </p>
                    <button onClick={toggleModal} className="ml-2">
                      <FontAwesomeIcon icon={faPencilAlt} />{" "}
                      {/* Example using FontAwesome */}
                    </button>
                  </div>
                </div>
                {/* Conditional rendering for the modal */}
                {isModalOpen && (
                  <NicknameModal isOpen={isModalOpen} onClose={toggleModal} />
                )}

                {/* Container for upload and remove buttons for better grouping and spacing */}
                <div className="flex items-center space-x-2 mt-4">
                  {" "}
                  {/* Adjusted spacing and alignment */}
                  <label
                    htmlFor="fileInput"
                    className="bg-black text-white px-3 py-1 rounded shadow cursor-pointer"
                  >
                    Upload new
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button className="bg-red-500 text-white px-3 py-1 rounded shadow">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex flex-col w-full md:w-auto md:flex-row gap-4 md:gap-16 justify-between">
                <div className="flex flex-col">
                  <p className="text-gray-500">First Name</p>
                  <p>{user ? user.firstName : "Loading..."}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Last Name</p>
                  <p>{user ? user.lastName : "Loading"}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Email address</p>
                  <p>{user ? user.email : "Loading"}</p>
                </div>
                <FlagPickerModal />
              </div>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">
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
