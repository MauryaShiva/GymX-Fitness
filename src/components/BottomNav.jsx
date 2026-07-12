import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const handleSearchClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-search"));
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full md:hidden pb-safe backdrop-blur-md bg-black/80 border-t border-gray-800 text-gray-400">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-red-500" : "hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center"
              >
                <Home size={24} />
                <span className="text-[10px] mt-1 font-medium">Home</span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute -top-2 w-1 h-1 bg-red-500 rounded-full"
                  />
                )}
              </motion.div>
            </>
          )}
        </NavLink>

        <a
          href="#exercises"
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full hover:text-white transition-colors"
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <Search size={24} />
            <span className="text-[10px] mt-1 font-medium">Search</span>
          </motion.div>
        </a>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-red-500" : "hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center"
              >
                <PlaySquare size={24} />
                <span className="text-[10px] mt-1 font-medium">Workouts</span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute -top-2 w-1 h-1 bg-red-500 rounded-full"
                  />
                )}
              </motion.div>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
