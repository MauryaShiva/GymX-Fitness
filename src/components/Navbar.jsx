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
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>

        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home Workouts
          </NavLink>

          <button
            onClick={handleSearchClick}
            className="text-text-primary hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </div>

        {/* Search button on mobile (Top header search is useful even with bottom nav) */}
        <div className="md:hidden flex items-center">
           <button
            onClick={handleSearchClick}
            className="text-text-primary hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
