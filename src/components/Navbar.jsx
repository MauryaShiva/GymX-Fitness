import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 z-50 w-full bg-white px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-100">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img
              src={Logo}
              alt="GymX Logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 text-base font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "no-underline text-[#3A1212] border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                  : "no-underline text-[#3A1212] pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/home-workouts"
              className={({ isActive }) =>
                isActive
                  ? "no-underline text-[#3A1212] border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                  : "no-underline text-[#3A1212] pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }
            >
              Home Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Header */}
      <nav className="md:hidden fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 pt-safe px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={Logo} alt="GymX" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold text-lg tracking-tight">GymX</span>
          </NavLink>

          <button
            className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-full"
            onClick={() => {
               // We will open the MobileSearchOverlay by dispatching a custom event
               const event = new CustomEvent('open-mobile-search');
               window.dispatchEvent(event);
            }}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
