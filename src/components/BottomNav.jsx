import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const tabs = [
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Exercises", path: "/#exercises", icon: <Dumbbell size={24} /> },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar size={24} /> },
    { name: "Favorites", path: "/favorites", icon: <Heart size={24} /> },
    { name: "About", path: "/about", icon: <Info size={24} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive && tab.path !== "/#exercises" && tab.path !== "/favorites" && tab.path !== "/about" ? "text-red-500" : "text-gray-400 hover:text-white"
              }`
            }
          >
            {() => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {tab.icon}
                <span className="text-[10px] font-medium mt-1">{tab.name}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
