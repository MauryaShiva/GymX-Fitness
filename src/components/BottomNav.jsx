import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlayCircle, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-background/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <Home className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">Home</span>
            </motion.div>
          )}
        </NavLink>

        <NavLink
          to="/#exercises"
          onClick={() => {
            const exercisesSection = document.getElementById("exercises");
            if (exercisesSection) {
              exercisesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 text-gray-400 hover:text-gray-200`
          }
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-medium">Exercises</span>
          </motion.div>
        </NavLink>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <PlayCircle className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">Workouts</span>
            </motion.div>
          )}
        </NavLink>

        {/* Note: Favorites and About routes do not exist yet, they serve as placeholders for standard app nav layout */}
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <Heart className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">Favorites</span>
            </motion.div>
          )}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <Info className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">About</span>
            </motion.div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
