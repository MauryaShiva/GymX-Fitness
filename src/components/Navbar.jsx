import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      const event = new CustomEvent("open-search");
      window.dispatchEvent(event);
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 pt-safe-top ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-2' : 'bg-transparent py-4'}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] brightness-200"
          />
        </NavLink>

        {/* Mobile Search Shortcut - Hidden on Desktop */}
        <button
          onClick={handleSearchClick}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>

        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-white border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-gray-300 pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home Workouts
          </NavLink>
          <button
            onClick={handleSearchClick}
            className="p-2 text-gray-300 hover:text-white transition-colors ml-4"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
