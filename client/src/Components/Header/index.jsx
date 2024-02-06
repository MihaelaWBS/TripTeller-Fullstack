import { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AuthContext } from "../../Context/Auth";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";

const index = () => {
  const { userId } = useParams();
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="TripTeller" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TripTeller
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
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
              <Link to={`/myprofile/${user._id}`}>
                {" "}
                <Dropdown.Item>My profile</Dropdown.Item>
              </Link>
              <Link to={`/trips/itinerary`}>
                <Dropdown.Item>My itinerary</Dropdown.Item>
              </Link>
              <Dropdown.Item>Upcoming trips</Dropdown.Item>
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
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default index;
