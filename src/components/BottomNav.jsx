import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Play, Search, Heart, User } from "lucide-react"; // Sample icons, can adjust

const tabs = [
  { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
  { name: "Workouts", path: "/home-workouts", icon: <Play className="w-6 h-6" /> }
];

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${
                isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {tab.icon}
                <span className="text-[10px] mt-1 font-medium">{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-[2px] w-8 h-1 bg-red-500 rounded-t-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
