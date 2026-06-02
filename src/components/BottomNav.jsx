import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = ({ onSearchClick }) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe"
    >
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center w-16 h-full text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          <div className="bg-red-600 rounded-full p-3 shadow-lg shadow-red-500/30 transform -translate-y-4">
            <Search className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium -mt-2">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <CalendarDays className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default BottomNav;