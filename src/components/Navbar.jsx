import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const handleOpenSearch = () => {
    window.dispatchEvent(new Event("open-search"));
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/90 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>

        {/* Mobile Search Trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleOpenSearch}
            className="p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Open Search"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

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
