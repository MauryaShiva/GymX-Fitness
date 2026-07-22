import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

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
      className={`fixed top-0 z-50 w-full px-4 sm:px-8 md:px-12 py-3 transition-all duration-300 pt-safe-top ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
          />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Gym<span className="text-primary">X</span></span>
        </NavLink>

        {/* Navigation Links - Hidden on mobile, shown on md and above */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
            }
          >
            Home Workouts
          </NavLink>

          <button
            onClick={handleSearchClick}
            className="text-text-secondary hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Search Icon - Shown only on small screens (when not handled by BottomNav) */}
        <div className="md:hidden flex items-center">
          {/* Note: BottomNav usually handles search on mobile, but keeping this for top header actions if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
