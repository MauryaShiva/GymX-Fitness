import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Dumbbell } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50 pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive && location.search !== "?search=true" ? "text-red-600" : "text-gray-500 hover:text-gray-900"
            } transition-colors duration-200`
          }
        >
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
        >
          <div className="bg-red-500 text-white p-3 rounded-full -mt-6 shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
             <Search className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium mt-1">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? "text-red-600" : "text-gray-500 hover:text-gray-900"
            } transition-colors duration-200`
          }
        >
          <Dumbbell className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">Workouts</span>
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
