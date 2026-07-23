import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        isScrolled
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2 sm:py-3"
          : "bg-background py-3 sm:py-4"
      } px-4 sm:px-8 md:px-12`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white hidden sm:block">
            Gym<span className="text-primary">X</span>
          </span>
        </NavLink>

        {/* Mobile Search Shortcut */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleSearchClick}
            className="p-2 text-text-secondary hover:text-primary transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <button
            onClick={handleSearchClick}
            className="text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary flex items-center gap-2 cursor-pointer"
          >
            Search
          </button>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
