import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-[15vh] bg-gray-900 px-6 md:px-20">
      {/* Logo */}
      <div>
        <img
          src={Logo}
          alt="yolobank"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
      </div>

      {/* Menu Links */}
      <div className="flex flex-row gap-4 md:gap-6 items-center">
        <a
          href="https://github.com/edenzewdu/online-banking-springboot-react"
          target="_blank"
          rel="noreferrer"
          className="text-gray-200 hover:bg-gray-700/[0.2] px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Github
        </a>

        <NavLink
          to="/contactUs"
          className="text-gray-200 hover:bg-gray-700/[0.2] px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Contact Us
        </NavLink>

        <NavLink
          to="/about"
          className="text-gray-200 hover:bg-gray-700/[0.2] px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          About
        </NavLink>

        <NavLink
          to="/login"
          className="bg-gray-100 text-gray-900 hover:bg-gray-700 hover:text-gray-100 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
