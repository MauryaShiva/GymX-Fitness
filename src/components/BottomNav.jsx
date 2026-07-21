import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Search, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe"
    >
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive && location.search !== "?search=true" ? "text-red-500" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={handleSearchClick}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            location.search === "?search=true" ? "text-red-500" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Dumbbell className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        <a
          href="#about" // Could be linked to an actual page later
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-200 transition-colors"
        >
          <Info className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">About</span>
        </a>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
