import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";
import Logo from "../../assets/images/logo.jpg";

const Login = () => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { BASE_URL, gettingAUser } = useBankingSystem();

  const TOKEN_EXPIRY_DURATION = 15 * 60 * 1000; // 15 mins

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/login`, {
        email,
        password,
      });

      if (resp.status === 200) {
        if (resp.data.user.emailVerified === false) {
          toast.error("Email is not verified!");
          navigateTo("/signup/otp");
          return;
        }

        // Save token + userId
        sessionStorage.setItem("jwtToken", resp.data.jwtToken);
        sessionStorage.setItem("userId", resp.data.user.userId);

        gettingAUser();

        // Auto logout on expiry
        setTimeout(() => {
          sessionStorage.clear();
          navigateTo("/login");
          toast.error("Session timed out, please re-login.");
        }, TOKEN_EXPIRY_DURATION);

        toast.success("Login Successful!");
        if (resp.data.user.role === "ADMIN") {
          navigateTo("/admin/dashboard");
        } else {
          navigateTo("/dashboard");
        }
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={Logo}
          alt="Logo"
          className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md"
        />
      </div>

      {/* Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <NavLink
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create a new account
          </NavLink>
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form onSubmit={submitLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p
                  onClick={() => navigateTo("/forgot-password")}
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
