import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";
import SyncLoader from "react-spinners/SyncLoader";
import Logo from "../../assets/images/logo.jpg";

const Register = () => {
  const { BASE_URL } = useBankingSystem();
  const navigateTo = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = userDetails;

    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters!");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/signup`, {
        firstname,
        lastname,
        email,
        password,
      });

      sessionStorage.setItem("userId", resp.data.userId);

      if (resp.status === 200) {
        navigateTo("/login");
        toast.success("Registration Successful! Please verify your email.");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Something went wrong! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <SyncLoader
            margin={10}
            size={20}
            speedMultiplier={1}
            color={"#6366F1"}
            loading={isLoading}
          />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-6">
            <img 
              src={Logo} 
              alt="Logo" 
              className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md"
            />
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <NavLink
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in to your account
              </NavLink>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    value={userDetails.firstname}
                    onChange={handleDetails}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    value={userDetails.lastname}
                    onChange={handleDetails}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={userDetails.email}
                    onChange={handleDetails}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    value={userDetails.password}
                    onChange={handleDetails}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
