import React from 'react';
import bankpic from "../../assets/images/banking-hero.png";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const LandingHero = () => {
  return (
    <section className="text-gray-900 body-font md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">

        {/* Left Text Section */}
        <div className="md:w-1/2 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-3xl mb-6 font-bold text-gray-900">
            Smooth Banking, Anytime, Anywhere
          </h1>
          <p className="mb-8 leading-relaxed">
            Manage your money, transfer funds, and open accounts effortlessly with our secure and intuitive banking platform.
          </p>
          <NavLink
          to="/signup"
          className="flex flex-row items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-900 transition-all duration-300"
        >
          Get Started <BsArrowRight className="text-xl" />
        </NavLink>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center w-full">
          <img
            className="object-cover object-center rounded-full border-4 border-gray-100 shadow-lg w-80 md:w-auto"
            alt="hero"
            src={bankpic}
          />
        </div>

      </div>
    </section>
  )
}

export default LandingHero;
