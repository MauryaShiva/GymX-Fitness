import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-lg px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-md border-b border-gray-800 transition-all duration-300 pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 filter brightness-125"
          />
          <span className="text-xl font-bold text-text-primary tracking-wide">GymX</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary"
            }
          >
            Home Workouts
          </NavLink>

          {/* Desktop Search Shortcut */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchClick}
            className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-text-secondary hover:text-primary hover:bg-gray-700 transition-colors"
            aria-label="Search exercises"
          >
            <Search size={20} />
          </motion.button>
        </div>

        {/* Mobile Search Shortcut (Visible only when Navbar is present on mobile) */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSearchClick}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-text-secondary active:text-primary active:bg-gray-700 transition-colors"
            aria-label="Search exercises"
          >
            <Search size={20} />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
