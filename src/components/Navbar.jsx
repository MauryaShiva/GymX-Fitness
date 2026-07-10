import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo-1.png";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-md border-b border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
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
        </div>

        {/* Mobile Search Shortcut */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 text-text-primary hover:text-primary transition-colors focus:outline-none"
            onClick={() => {
              if (window.location.pathname !== '/') {
                window.location.href = '/';
              }
              setTimeout(() => {
                const searchInput = document.getElementById('mobile-search-trigger');
                if (searchInput) searchInput.focus();
              }, 100);
            }}
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
