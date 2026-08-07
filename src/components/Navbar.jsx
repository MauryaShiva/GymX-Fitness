import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2 sm:py-3"
          : "bg-transparent py-4 sm:py-5"
      } px-4 sm:px-8 md:px-12`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center z-10">
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
          />
          <span className="ml-3 text-xl font-bold tracking-tight text-white hidden sm:block">
            GymX
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium z-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Home Workouts
          </NavLink>
        </div>

        {/* Right side actions (Search) */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-full bg-surface/50 text-text-secondary hover:text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Search"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;