import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineTicket,
  HiOutlineGlobeAlt,
  HiOutlineChatAlt2,
  HiOutlineStar,
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineCash,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <Sidebar className="shadow-xl" aria-label="Sidebar with single-level menu">
      <Sidebar.Items className="bg-white dark:bg-gray-800">
        <Sidebar.ItemGroup>
          <Link to="/">
            <Sidebar.Item href="#" icon={HiOutlineHome}>
                Home
            </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiOutlineClipboardList}>
            All bookings
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineHome}>
            Hotels
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineTicket}>
            Flights
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineGlobeAlt}>
            Activities
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineChatAlt2}>
            Property messages
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineStar}>
            Reviews
          </Sidebar.Item>
          <Link to="/blog/post/addPost">
            <Sidebar.Item href="#" icon={HiOutlineStar}>
                Add New Post
            </Sidebar.Item>
          </Link>
          <Link to="/blog">
            <Sidebar.Item href="#" icon={HiOutlineDocumentText}>
                My Blog
            </Sidebar.Item>
          </Link>
          <Link to="/upcomingtrips">
            <Sidebar.Item href="#" icon={HiOutlineDocumentText}>
                Upcoming Trips
            </Sidebar.Item>
          </Link>

          <Link to="/trips/itinerary">
            <Sidebar.Item href="#" icon={HiOutlineBriefcase}>
              My itinerary
            </Sidebar.Item>
          </Link>
          <Link to="/myprofile/:userId">
            <Sidebar.Item href="#" icon={HiOutlineUserCircle}>
              My Account
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
