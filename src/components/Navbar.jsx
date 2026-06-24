import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    // Hidden on mobile, flex on md and above screens. Updated to dark theme
    <nav className="hidden md:block sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-white font-bold text-xl tracking-tight hidden lg:block">GymX</span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-red-500"
            }
          >
            Home Workouts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
