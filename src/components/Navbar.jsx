import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
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
      className="fixed top-0 z-40 w-full pt-safe-top bg-surface/80 backdrop-blur-md border-b border-border shadow-md"
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto px-4 md:px-8 h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-105"
          />
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            GymX
          </span>
        </NavLink>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-1 py-2 transition-colors ${
                isActive ? "text-primary" : "text-text-secondary hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <motion.div
                    layoutId="desktopNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                  />
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              `relative px-1 py-2 transition-colors ${
                isActive ? "text-primary" : "text-text-secondary hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Workouts
                {isActive && (
                  <motion.div
                    layoutId="desktopNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                  />
                )}
              </>
            )}
          </NavLink>
        </div>

        {/* Search Shortcut for both Mobile & Desktop */}
        <button
          onClick={handleSearchClick}
          className="p-2 rounded-full bg-surface-hover text-text-secondary hover:text-white hover:bg-border transition-colors active:scale-95"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
