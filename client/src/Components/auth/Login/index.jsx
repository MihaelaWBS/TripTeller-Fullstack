import { useState, useContext } from "react";
import { AuthContext } from "../../../Context/Auth";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import facebookIcon from "../../../assets/icons8-facebook-48.png";
import googleIcon from "../../../assets/icons8-google-48.png";

const index = () => {
  const context = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(user);
  };
  if (!context.loading && context.user) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.user) {
    return (
      <>
        <div className="w-full max-w-lg mx-auto my-auto">
          <form
            className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 "
            onSubmit={handleSubmit}
          >
            <h2 className="text-gray-700 text-2xl font-bold mb-4">Sign in</h2>
            <p className="text-gray-600 text-sm mb-8">
              For security, please sign in to access your information
            </p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <div>
                {context.loginError && (
                  <div className="mb-4 text-center text-red-500">
                    {typeof context.loginError === "object"
                      ? JSON.stringify(context.loginError)
                      : context.loginError}{" "}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <button
                  className="bg-orange-500 max-w-2xl w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/signup"
              >
                Create account
              </Link>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faLock} color="orange" />
                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
                Google
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="h-5 w-5 mr-2"
                />
                Facebook
              </button>
            </div>
            {/*  <p className="text-sm text-center text-gray-500 mt-6">
              By signing in, I agree to Agoda's Terms of Use and Privacy Policy.
            </p> */}
          </form>
        </div>
      </>
    );
  }
};

export default index;
