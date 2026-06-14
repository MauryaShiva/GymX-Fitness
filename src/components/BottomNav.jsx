import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, PlayCircle, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Exercises", path: "/#exercises", icon: <Search size={24} /> },
    { name: "Workouts", path: "/home-workouts", icon: <PlayCircle size={24} /> },
    { name: "Favorites", path: "/favorites", icon: <Heart size={24} /> },
    { name: "About", path: "/about", icon: <Info size={24} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <ul className="flex items-center justify-around w-full h-16 px-2">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                  isActive ? "text-red-500" : "text-gray-500 hover:text-red-400"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center min-h-[44px] min-w-[44px] justify-center"
                >
                  {item.icon}
                  <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                    {item.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
