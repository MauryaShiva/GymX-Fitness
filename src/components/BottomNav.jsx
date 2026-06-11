import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: <Home size={24} />, label: "Home" },
    { to: "/exercises", icon: <Dumbbell size={24} />, label: "Exercises" },
    { to: "/home-workouts", icon: <PlaySquare size={24} />, label: "Workouts" },
    { to: "/favorites", icon: <Heart size={24} />, label: "Favorites" },
    { to: "/about", icon: <Info size={24} />, label: "About" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 w-full z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
                isActive ? "text-red-600" : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  animate={isActive ? { y: -2 } : { y: 0 }}
                >
                  {item.icon}
                </motion.div>
                <span className={`text-[10px] font-medium ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-1 w-1 h-1 bg-red-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default BottomNav;
