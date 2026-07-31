import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/70 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 border-b border-gray-800 transition-all pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 brightness-200"
          />
          <span className="text-xl font-bold text-white tracking-wider hidden sm:block">GymX</span>
        </NavLink>

        {/* Navigation Links (Hidden on small mobile, handled by BottomNav) */}
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
          <button
            onClick={handleSearchClick}
            className="text-text-secondary hover:text-primary transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile top-right search shortcut (visible only on small screens) */}
        <div className="md:hidden flex items-center">
             <button
            onClick={handleSearchClick}
            className="text-text-secondary hover:text-primary transition-colors flex items-center justify-center p-2"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
