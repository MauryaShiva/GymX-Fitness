import React from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const triggerSearch = (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = "/?search=true";
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-2 sm:py-4 shadow-md border-b border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="ml-2 font-bold text-xl md:text-2xl text-text-primary tracking-tight hidden sm:block">GymX</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home Workouts
          </NavLink>

          <button
            onClick={triggerSearch}
            className="flex items-center gap-2 bg-background border border-gray-700 rounded-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-gray-500 transition-all duration-300"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
          </button>
        </div>

        {/* Mobile Right Side (Search Shortcut) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={triggerSearch}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
            aria-label="Open Search"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
