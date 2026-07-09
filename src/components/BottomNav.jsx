import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();

  const tabs = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className="flex flex-col items-center justify-center w-full h-full text-gray-500 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-red-500 rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`transition-colors duration-300 ${
                  isActive ? "text-red-500" : "hover:text-red-400"
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isActive ? "text-red-500 font-semibold" : "font-medium"
                }`}
              >
                {tab.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
