import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/images/logo.jpg';

const NavbarDashboard = () => {
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigateTo("/login");
    toast.success("Sign Out Successful!");
  };

  return (
    <nav className="w-full bg-gray-800 justify-between items-center shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex justify-between items-center h-24">
        {/* Logo / Welcome */}
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md"
          />
        </div>
        <h5 className="text-white font-semibold ">EZee Bank</h5>
        {/* Navigation with icons */}
        <div className="flex items-center space-x-6">
          {/* Profile */}
          <NavLink
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer shadow-md"
          >
            <UserIcon className="w-6 h-6" />
            <span>Profile</span>
          </NavLink>

          {/* Sign Out */}
          <div
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-white font-semibold rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300 cursor-pointer shadow-md"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;

