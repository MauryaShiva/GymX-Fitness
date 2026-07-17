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
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full pt-safe-top transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-lg border-b border-gray-800 py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white hidden md:block">
            Gym<span className="text-primary">X</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Mobile Search Icon & Title (visible on mobile, hidden on desktop) */}
        <div className="flex items-center gap-4 md:hidden">
          <span className="text-xl font-bold tracking-tight text-white">
            Gym<span className="text-primary">X</span>
          </span>
          <button
            onClick={handleSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover border border-gray-800 text-gray-300"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
