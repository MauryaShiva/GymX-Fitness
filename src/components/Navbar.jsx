import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

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

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-safe-top ${
        scrolled
          ? "bg-white/80 dark:bg-surface/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={Logo} alt="GymX Logo" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
          <span className={`text-xl font-bold tracking-tight md:hidden ${scrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>GymX</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-red-500 dark:text-primary border-b-2 border-red-500 dark:border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-700 dark:text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 dark:hover:text-primary hover:border-b-2 hover:border-red-500 dark:hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-red-500 dark:text-primary border-b-2 border-red-500 dark:border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-700 dark:text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 dark:hover:text-primary hover:border-b-2 hover:border-red-500 dark:hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Mobile Search Shortcut - Only visible on mobile header */}
        <button
          onClick={handleSearchClick}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm"
          aria-label="Search exercises"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
