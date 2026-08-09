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
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-md border-b border-border pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
          />
          <span className="text-text-primary font-bold text-xl tracking-tight hidden sm:block">GymX</span>
        </NavLink>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Search Action (Desktop & Mobile) */}
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchClick}
            className="p-2 text-text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full md:bg-background md:border md:border-border md:px-4 md:py-2 md:flex md:items-center md:gap-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:inline text-sm font-medium">Search</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
