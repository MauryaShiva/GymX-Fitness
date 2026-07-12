import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const handleSearchClick = () => {
    window.dispatchEvent(new Event("open-search"));
  };

  return (
    <nav className="sticky top-0 z-50 w-full pt-safe-top bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-800 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 brightness-200"
          />
        </NavLink>

        {/* Mobile Search Icon */}
        <button
          onClick={handleSearchClick}
          className="md:hidden text-gray-300 hover:text-white p-2"
        >
          <Search size={24} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
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
