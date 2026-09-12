import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

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
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gray-800 pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(3,218,198,0.5)]"
          />
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Gym<span className="text-primary">X</span></span>
        </NavLink>

        {/* Navigation Links - Hidden on Mobile, shown on Desktop */}
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
          <button
             onClick={() => document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" })}
             className="no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary cursor-pointer"
          >
            Exercises
          </button>
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

        {/* Search Shortcut for Desktop */}
        <div className="hidden md:block">
           <button
             onClick={handleSearchClick}
             className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-text-secondary hover:text-white transition-colors border border-gray-700"
           >
             <Search size={18} />
             <span className="text-sm">Search...</span>
           </button>
        </div>

        {/* Mobile Search Icon (optional, if we want it in top bar too) */}
        <div className="md:hidden">
          <button onClick={handleSearchClick} className="p-2 text-text-secondary hover:text-primary transition-colors">
             <Search size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
