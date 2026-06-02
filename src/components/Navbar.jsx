import React from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo-1.png";

const Navbar = ({ onSearchClick }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 border-b border-gray-800 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto pt-safe">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white font-bold text-xl hidden sm:block tracking-tight">GymX</span>
        </NavLink>

        {/* Mobile Search Icon (visible only on small screens) */}
        <button
          onClick={onSearchClick}
          className="md:hidden p-2 text-gray-300 hover:text-white bg-gray-800 rounded-full transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
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
