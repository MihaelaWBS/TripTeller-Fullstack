import { useContext, useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AuthContext } from "../../Context/Auth";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import HeaderWeather from "../HeaderWeather/HeaderWeather";
import axiosInstance from "../../axiosInstance";
import DarkModeToggle from 'react-dark-mode-toggle';

const index = () => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [upcomingTripsLength, setUpcomingTripsLength] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/posts/user/${user._id}`)
        .then((res) => {
          setPosts(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/upcomingTrips/user/${user._id}`)
        .then((res) => {
          setUpcomingTripsLength(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/itineraries/user/${user._id}`)
        .then((res) => {
          setItinerary(Array.isArray(res.data) ? res.data : []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.classList = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);


  return (
    <>
      <Navbar fluid rounded style={{ position: "relative" }}>
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="TripTeller" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TripTeller
          </span>
          <div className="absolute left-60 top-1/2 transform -translate-y-1/2">
            <HeaderWeather />
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={60}
            className="my-auto mr-4"
          />
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={user && user.avatar} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user && `${user.firstName} ${user.lastName}`}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user && user.email}
                </span>
              </Dropdown.Header>
              <Link to={`/myprofile`}>
                {" "}
                <Dropdown.Item>My profile</Dropdown.Item>
              </Link>
              <Link to={`/trips/itinerary`}>
                <Dropdown.Item>My itinerary ({itinerary.length})</Dropdown.Item>
              </Link>
              <Link to="/upcomingtrips">
                <Dropdown.Item>
                  Upcoming trips ({upcomingTripsLength.length})
                </Dropdown.Item>
              </Link>
              <Link to="/myposts">
                <Dropdown.Item>My posts ({posts.length})</Dropdown.Item>
              </Link>
              <Link to="/blog">
                <Dropdown.Item>Blog</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="text-sm px-4 py-2">
                Login
              </Link>
              <Link to="/signup" className="text-sm px-4 py-2">
                Sign up
              </Link>
            </>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <div className="flex">
            <Link to="/hotels" className="block py-2 px-4 text-sm">
              Hotels
            </Link>
            <Link to="/restaurants" className="block py-2 px-4 text-sm">
              Restaurants
            </Link>
            <Link to="/attractions" className="block py-2 px-4 text-sm">
              Attractions
            </Link>
            <Link to="/taxi" className="block py-2 px-4 text-sm">
              Taxi
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default index;
