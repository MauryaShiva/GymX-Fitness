import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

import { Search } from "lucide-react";

const Navbar = () => {
  const handleMobileSearchShortcut = () => {
    // Custom event to trigger search focus on Home page
    window.dispatchEvent(new Event("global-search"));
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 z-50 w-full bg-white px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-100 pt-safe">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
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

      {/* Mobile Sticky Glassmorphism Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 pt-safe shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-2 h-14">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={Logo} alt="GymX Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-gray-900 tracking-tight">GymX</span>
          </NavLink>

          <button
            onClick={handleMobileSearchShortcut}
            className="p-2 rounded-full bg-gray-100/80 text-gray-700 hover:bg-gray-200 active:scale-95 transition-all shadow-inner"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
