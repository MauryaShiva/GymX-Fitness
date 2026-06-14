import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-2 sm:py-3 shadow-sm border-b border-gray-100/50 pt-safe"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </NavLink>

        {/* Navigation Links - Hidden on Mobile */}
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
