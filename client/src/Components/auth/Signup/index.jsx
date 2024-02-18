import { useState, useContext } from "react";

import { AuthContext } from "../../../Context/Auth";
import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";

const index = () => {
  const context = useContext(AuthContext);
  const errors = context.errors;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.register(formData);
  };

  if (!context.loading && context.user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="w-full max-w-lg items-center my-auto justify-center mx-auto">
        <form
          className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <p className=" text-2xl font-extrabold">Sign up</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            {context.errors && (
              <div className="mb-4 text-center text-red-500">
                {typeof context.errors === "object"
                  ? JSON.stringify(context.errors)
                  : context.errors}{" "}
              </div>
            )}
          </div>
          <div className="mb-6">
            {/* <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                name="agreeToPromotions"
                checked={formData.agreeToPromotions}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-600">
                Email me exclusive Agoda promotions. I can opt out later as
                stated in the Privacy Policy.
              </span>
            </label> */}
            <button
              className="bg-orange-500 max-w-2xl w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/signin"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default index;
