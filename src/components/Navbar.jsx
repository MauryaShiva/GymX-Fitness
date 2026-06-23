import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Hide navbar on scroll down, show on scroll up (for mobile)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("global-search"));
      }, 100);
    } else {
      window.dispatchEvent(new CustomEvent("global-search"));
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full pt-safe bg-background/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>

        {/* Mobile Search Shortcut */}
        <div className="flex md:hidden items-center">
          <button
            onClick={handleSearchClick}
            className="p-2 text-text-primary bg-surface rounded-full shadow-md"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Navigation Links - Hidden on Mobile */}
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
