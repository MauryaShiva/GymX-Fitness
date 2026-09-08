import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full glass px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-white/5 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
          />
          <span className="text-xl font-extrabold tracking-tight text-white hidden sm:block">Gym<span className="text-primary">X</span></span>
        </NavLink>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Search Shortcut */}
        <button
          onClick={handleSearchClick}
          className="p-2 rounded-full bg-surface/50 text-text-secondary hover:text-primary hover:bg-surface border border-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          aria-label="Search exercises"
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
