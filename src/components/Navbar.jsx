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

  const handleSearchClick = () => {
    if (location.pathname !== '/') {
      navigate('/?search=true');
    } else {
      window.dispatchEvent(new Event('open-search'));
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
    } px-4 sm:px-8 md:px-12 py-3 sm:py-4 border-b border-gray-100 pt-safe-top`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
          />
          <span className="ml-2 font-bold text-xl md:hidden text-gray-900 tracking-tight">GymX</span>
        </NavLink>

        {/* Mobile Search Icon */}
        <button
          onClick={handleSearchClick}
          className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors bg-gray-100 rounded-full"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-[#3A1212] border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-[#3A1212] pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-[#3A1212] border-b-2 border-red-500 pb-1 font-semibold transition-all duration-300"
                : "no-underline text-[#3A1212] pb-1 font-medium transition-all duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500"
            }
          >
            Home Workouts
          </NavLink>
          <button
            onClick={handleSearchClick}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
