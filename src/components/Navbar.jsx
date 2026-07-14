import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/");
    setTimeout(() => {
      window.dispatchEvent(new Event("open-search"));
    }, 100);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800 pt-safe-top transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 filter drop-shadow-md"
          />
          <span className="ml-3 text-xl font-bold text-text-primary tracking-tight hidden sm:block">
            Gym<span className="text-primary">X</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary/50"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary/50"
            }
          >
            Workouts
          </NavLink>

          {/* Desktop Search Icon */}
          <button
            onClick={handleSearchClick}
            className="text-text-primary hover:text-primary transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-800"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Search Icon (only visible when not home, as bottom nav has search) */}
        <div className="md:hidden flex items-center">
           <button
            onClick={handleSearchClick}
            className="text-text-primary hover:text-primary transition-colors focus:outline-none p-2"
            aria-label="Search"
          >
            <Search size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
