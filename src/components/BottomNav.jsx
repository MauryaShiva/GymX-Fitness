import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Exercises", path: "/#exercises", icon: <Dumbbell className="w-6 h-6" /> },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar className="w-6 h-6" /> },
    { name: "Favorites", path: "/#", icon: <Heart className="w-6 h-6" /> },
    { name: "About", path: "/#", icon: <Info className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-background/80 backdrop-blur-lg border-t border-gray-800">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center ${
                  isActive ? "text-primary" : "text-gray-400"
                }`}
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-[1px] w-8 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
