import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 brightness-0 invert"
          />
          <span className="text-text-primary font-bold text-xl tracking-tight hidden md:block">GymX</span>
        </NavLink>

        {/* Mobile Search Icon (visible on small screens) */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSearchClick}
            className="p-2 rounded-full bg-surface text-gray-300 hover:text-primary transition-colors"
          >
            <Search size={20} />
          </motion.button>
        </div>

        {/* Navigation Links (visible on large screens) */}
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
             onClick={handleSearchClick}
             className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors font-medium bg-surface px-4 py-2 rounded-full"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
