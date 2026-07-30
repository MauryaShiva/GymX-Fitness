import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Search } from "lucide-react";
import { motion } from "framer-motion";

const MotionNavLink = motion.create(NavLink);

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe pt-2 px-6 shadow-2xl">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <MotionNavLink
          to="/"
          whileTap={{ scale: 0.9 }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 w-16 h-14 ${
              isActive && location.search !== "?search=true" ? "text-primary" : "text-gray-400"
            }`
          }
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </MotionNavLink>

        <button
          onClick={handleSearchClick}
          className={`flex flex-col items-center justify-center p-2 w-16 h-14 ${
            location.search === "?search=true" ? "text-primary" : "text-gray-400"
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            <Search className="w-6 h-6 mb-1 mx-auto" />
            <span className="text-[10px] font-medium">Search</span>
          </motion.div>
        </button>

        <MotionNavLink
          to="/home-workouts"
          whileTap={{ scale: 0.9 }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 w-16 h-14 ${
              isActive ? "text-primary" : "text-gray-400"
            }`
          }
        >
          <Dumbbell className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Workouts</span>
        </MotionNavLink>
      </div>
    </nav>
  );
};

export default BottomNav;