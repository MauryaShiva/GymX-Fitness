import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-sm border-b border-gray-100 pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-xl font-bold text-gray-900 md:hidden">GymX</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
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

        {/* Mobile Search Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleSearchClick}
            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
