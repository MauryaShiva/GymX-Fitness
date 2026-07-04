import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchShortcut = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { openSearch: true } });
    } else {
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-lg px-4 sm:px-8 md:px-12 py-3 sm:py-4 border-b border-surface-light shadow-md pt-safe">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
          />
          <span className="text-xl font-extrabold text-white tracking-tight hidden sm:block">
            Gym<span className="text-primary">X</span>
          </span>
        </NavLink>

        {/* Mobile Search Shortcut */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleSearchShortcut}
            className="p-2 rounded-full bg-surface-light text-text-primary hover:bg-gray-600 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
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
