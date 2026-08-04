import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-safe-top ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2 md:py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 md:gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
          <span className="text-white font-extrabold text-xl md:text-2xl tracking-tight">GymX</span>
        </NavLink>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>

          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-gray-300 hover:text-white border border-gray-700"
            aria-label="Search exercises"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Shortcut */}
        <div className="md:hidden">
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-gray-300 hover:text-white border border-gray-700"
            aria-label="Search exercises"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
