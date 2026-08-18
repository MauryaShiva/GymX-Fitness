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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe-top ${
        scrolled
          ? "bg-[var(--color-surface)]/80 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">GymX</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--color-primary)] transition-colors duration-300"
                : "text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--color-primary)] transition-colors duration-300"
                : "text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Search Icon (Visible on all breakpoints, but behavior managed) */}
        <button
          onClick={handleSearchClick}
          className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border border-gray-700"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
