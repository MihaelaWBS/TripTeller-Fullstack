import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import axiosInstance from "../../axiosInstance";
import nicknameOptions from "../NicknameOptions/NicknameOptions";
const NicknameModal = ({ onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedNickname, setSelectedNickname] = useState(user.nickname || "");

  const handleSave = async () => {
    try {
      // Assuming you have an endpoint to update the user's nickname
      const response = await axiosInstance.post(
        `/auth/users/${user._id}/nickname`,
        {
          nickname: selectedNickname,
        }
      );

      if (response.data) {
        // Update the user context with the new nickname
        setUser({ ...user, nickname: selectedNickname });
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* Modal panel, show modal on center screen */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Choose Your Nickname
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2 ">
                  {nicknameOptions.map((nickname) => (
                    <div key={nickname} className="mt-2">
                      <button
                        type="button"
                        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          selectedNickname === nickname ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setSelectedNickname(nickname)}
                      >
                        {nickname}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
