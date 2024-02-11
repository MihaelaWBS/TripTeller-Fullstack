import React, { useContext, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import Modal from "react-modal";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../Context/Auth";
import countryCodes from "../CountryCodes/CountryCodes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const FlagPickerModal = () => {
  const { user, setUser } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFlagSelect = async (countryCode) => {
    try {
      await axiosInstance.post(`/auth/users/${user._id}/flag`, {
        flag: countryCode,
      });
      setUser({ ...user, flag: countryCode });
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };
  return (
    <div>
      <button
        className="flex gap-2 items-center font-extrabold"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Choose your flag
        <FontAwesomeIcon icon={faGlobe} color="orange" />
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {countryCodes.map((code) => (
          <i
            key={code}
            className={`fi fi-${code} cursor-pointer`}
            onClick={() => {
              handleFlagSelect(code);
              toast.success("Flag changed!");
            }}
          ></i>
        ))}
      </Modal>
    </div>
  );
};

export default FlagPickerModal;
