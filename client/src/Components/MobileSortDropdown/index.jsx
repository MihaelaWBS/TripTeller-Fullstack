import React from "react";

const index = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between border-b-2 pb-3">
          <span className="text-lg ">Sort</span>
          <button onClick={onClose} className="text-lg font-semibold">
            X
          </button>
        </div>
        <div className="mt-3">
          <ul className="font-bold">
            <li className="border-b py-2">Sort: Lowest price</li>
            <li className="border-b py-2">Sort: Highest price</li>
            <li className="py-2">Sort: Highest rating</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
