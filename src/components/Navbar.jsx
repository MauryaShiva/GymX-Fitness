import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    const event = new CustomEvent("open-search");
    window.dispatchEvent(event);
    if (location.pathname !== "/") {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-2 sm:py-4 shadow-lg border-b border-gray-800 pt-safe-top transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-12 sm:h-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-12 sm:h-12 filter invert"
          />
        </NavLink>

        {/* Mobile Search Shortcut */}
        <button
          onClick={handleSearchClick}
          className="md:hidden text-white p-2"
        >
          <Search className="w-6 h-6" />
        </button>

        {/* Desktop Navigation Links (hidden on mobile) */}
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
