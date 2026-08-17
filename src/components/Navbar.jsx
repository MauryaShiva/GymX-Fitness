import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 pt-safe-top py-3 sm:py-4 shadow-md border-b border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 filter invert contrast-200" // Inverting for dark mode
          />
          <span className="text-xl font-bold text-text-primary hidden sm:block">GymX</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary/50"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary/50"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Mobile Search Icon & Desktop Search Shortcut */}
        <div className="flex items-center">
           <button
            onClick={handleSearchClick}
            className="p-2 text-text-secondary hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-white/5"
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
