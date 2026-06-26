import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    // If not on home, go home then dispatch global-search
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new Event("global-search"));
      }, 100);
    } else {
      window.dispatchEvent(new Event("global-search"));
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-4 sm:px-8 md:px-12 py-3 sm:py-4 transition-all duration-300 pt-safe ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center active:scale-95 transition-transform">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>

        {/* Right side controls */}
        <div className="flex items-center gap-6">
          {/* Mobile Search Shortcut */}
          <button
            onClick={handleSearchClick}
            className="md:hidden text-text-secondary hover:text-primary active:scale-95 transition-all bg-surface/50 p-2 rounded-full backdrop-blur-sm border border-gray-700"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Desktop Navigation Links */}
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
              className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
