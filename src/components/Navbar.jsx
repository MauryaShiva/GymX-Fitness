import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSearch = () => {
    // Dispatch custom event to open search overlay
    window.dispatchEvent(new Event("global-search"));
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full pt-safe transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100 py-2 sm:py-3"
          : "bg-white py-3 sm:py-4 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>

        {/* Mobile Search Icon */}
        <button
          onClick={openSearch}
          className="md:hidden p-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Search size={24} />
        </button>

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
      </div>
    </nav>
  );
};

export default Navbar;
