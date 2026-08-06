import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home as HomeIcon, FitnessCenter, Search as SearchIcon, CalendarToday } from "@mui/icons-material";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const MotionNavLink = motion.create(NavLink);
  const MotionButton = motion.create("button");

  const activeClass = "flex flex-col items-center justify-center text-red-500 w-full h-full";
  const inactiveClass = "flex flex-col items-center justify-center text-gray-400 hover:text-red-300 transition-colors w-full h-full";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        <MotionNavLink
          to="/"
          className={({ isActive }) => (isActive && location.search !== "?search=true" ? activeClass : inactiveClass)}
          whileTap={{ scale: 0.9 }}
        >
          <HomeIcon fontSize="small" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </MotionNavLink>

        <MotionNavLink
          to="/#exercises"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={inactiveClass}
          whileTap={{ scale: 0.9 }}
        >
          <FitnessCenter fontSize="small" />
          <span className="text-[10px] mt-1 font-medium">Exercises</span>
        </MotionNavLink>

        <MotionButton
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-red-300 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <div className="bg-red-600 rounded-full p-3 shadow-lg shadow-red-600/30 -mt-6 border-4 border-black">
            <SearchIcon className="text-white" />
          </div>
          <span className="text-[10px] mt-1 font-medium hidden">Search</span>
        </MotionButton>

        <MotionNavLink
          to="/home-workouts"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          whileTap={{ scale: 0.9 }}
        >
          <CalendarToday fontSize="small" />
          <span className="text-[10px] mt-1 font-medium">Workouts</span>
        </MotionNavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
