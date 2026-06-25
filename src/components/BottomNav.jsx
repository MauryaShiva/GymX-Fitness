import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Heart, PlaySquare, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare size={24} /> },
    // You can add more placeholder routes if needed, for now just reuse / or handle them later
    { name: "Favorites", path: "#", icon: <Heart size={24} />, disabled: true },
    { name: "Profile", path: "#", icon: <User size={24} />, disabled: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-black/70 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-20 px-4">
        {navItems.map((item) => (
          item.disabled ? (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center w-full h-full text-gray-500"
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
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
                  <div className="mb-1 relative">
                    {item.icon}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                    {item.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
