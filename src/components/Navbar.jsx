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

  const handleSearchShortcut = () => {
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-4"
      } pt-safe`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </NavLink>

        {/* Mobile Search Shortcut */}
        <button
          onClick={handleSearchShortcut}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Search exercises"
        >
          <Search className="h-6 w-6" />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white hover:border-b-2 hover:border-red-500"
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
