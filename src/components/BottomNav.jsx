import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, PlaySquare } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path, isSearch = false) => {
    if (isSearch) {
      // Dispatches open-search for SearchExercises.jsx overlay
      const event = new CustomEvent("open-search");
      window.dispatchEvent(event);
      if (location.pathname !== "/") {
        navigate("/?search=true");
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNavigation("/")}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400"
        >
          <Home className={`h-6 w-6 ${location.pathname === "/" ? "text-red-500" : ""}`} />
          <span className={`text-[10px] mt-1 ${location.pathname === "/" ? "text-red-500 font-bold" : ""}`}>
            Home
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNavigation("/", true)}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400"
        >
          <Search className="h-6 w-6" />
          <span className="text-[10px] mt-1">Search</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNavigation("/home-workouts")}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400"
        >
          <PlaySquare className={`h-6 w-6 ${location.pathname === "/home-workouts" ? "text-red-500" : ""}`} />
          <span className={`text-[10px] mt-1 ${location.pathname === "/home-workouts" ? "text-red-500 font-bold" : ""}`}>
            Workouts
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default BottomNav;
