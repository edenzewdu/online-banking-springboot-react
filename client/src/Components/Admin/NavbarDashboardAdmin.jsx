import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const NavbarDashboardAdmin = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigateTo("/login");
    toast.success("Sign Out Successful!");
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-4 bg-gray-900 shadow-md border-b border-gray-700">
      {/* Logo */}
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md"
        />
        
      </div>
      <h1 className="text-2xl font-bold text-white">Admin</h1>
{/* Navigation / Sign Out */}
<div className="flex items-center space-x-4">
  <NavLink
    to="/dashboard"
    className="px-4 py-2 text-white font-semibold rounded-lg border border-gray-700 shadow hover:bg-gray-700 transition-all duration-300"
  >
    Dashboard
  </NavLink>

  <button
    onClick={handleSignOut}
    className="flex items-center space-x-2 px-4 py-2 text-white font-semibold rounded-lg border border-gray-700 shadow hover:bg-white hover:text-red-500 transition-all duration-300 cursor-pointer"
  >
    <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-900" />
    <span className="text-gray-900">Sign Out</span>
  </button>
</div>
    </nav>
  );
};

export default NavbarDashboardAdmin;
