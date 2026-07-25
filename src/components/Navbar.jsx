import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-sm border-b border-gray-200 dark:bg-surface/80 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span className="ml-2 font-bold text-xl md:text-2xl text-gray-900 dark:text-white">GymX</span>
        </NavLink>

        {/* Mobile Action Icons (Hidden on Desktop) */}
        <div className="flex items-center gap-4 md:hidden">
           <button
             onClick={handleSearchClick}
             className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
           >
             <Search size={20} />
           </button>
        </div>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-red-500 border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-700 dark:text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-red-500 border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-700 dark:text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
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
