import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const index = () => {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="TripTeller" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TripTeller
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>My profile</Dropdown.Item>
            <Dropdown.Item>My trips</Dropdown.Item>
            <Dropdown.Item>Upcoming trips</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Collapse className=" md:hidden w-full ">
            <div className="flex justify-center flex-col items-center dark:text-white ">
              <Link to="/category/ai">Hotels</Link>

              <Link to="/category/tehnologija">Restaurants</Link>
              <Link to="/category/tujina">Attractions</Link>

              <Link to="/category/šport">Taxi</Link>
            </div>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default index;
