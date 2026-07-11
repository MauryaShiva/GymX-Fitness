import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, PlaySquare } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExercisesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe bg-surface/80 backdrop-blur-md border-t border-gray-800 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      <div className="flex justify-around items-center h-[70px] px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive && location.hash === "" ? "text-red-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
              <Home className={`w-6 h-6 ${isActive && location.hash === "" ? "stroke-2" : "stroke-1.5"}`} />
              <span className="text-[10px] font-medium">Home</span>
            </motion.div>
          )}
        </NavLink>

        <a
          href="#exercises"
          onClick={handleExercisesClick}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-white transition-colors"
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <Dumbbell className="w-6 h-6 stroke-1.5" />
            <span className="text-[10px] font-medium">Exercises</span>
          </motion.div>
        </a>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
              <PlaySquare className={`w-6 h-6 ${isActive ? "stroke-2" : "stroke-1.5"}`} />
              <span className="text-[10px] font-medium">Workouts</span>
            </motion.div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
