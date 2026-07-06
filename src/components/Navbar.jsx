import React from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md pt-safe border-b border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-3 sm:py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
          />
          <span className="ml-2 font-bold text-xl text-white tracking-tight hidden sm:block">GymX</span>
        </NavLink>

        {/* Mobile Search Icon - Hidden on desktop */}
        <div className="md:hidden">
          <button
            onClick={() => window.dispatchEvent(new Event('open-mobile-search'))}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
