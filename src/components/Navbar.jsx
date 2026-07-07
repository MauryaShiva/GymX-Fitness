import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";
import MobileSearchOverlay from "./MobileSearchOverlay";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-gray-950/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        } pt-safe-top`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="GymX Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 brightness-200"
            />
            <span className="text-xl font-bold text-white tracking-wide hidden sm:block">
              GymX
            </span>
          </NavLink>

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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            {location.pathname === "/" && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Open Search"
              >
                <Search className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay Component */}
      <MobileSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
