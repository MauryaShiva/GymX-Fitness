import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Exercises", path: "/#exercises", icon: <Dumbbell className="w-6 h-6" />, isAnchor: true },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare className="w-6 h-6" /> },
    // Adding optional tabs mentioned in requirements for a full app feel
    { name: "Favorites", path: "#", icon: <Heart className="w-6 h-6" />, disabled: true },
    { name: "About", path: "#", icon: <Info className="w-6 h-6" />, disabled: true },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe"
    >
      <ul className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          // Determine if we should use NavLink or a simple anchor/button based on if it's an anchor or disabled
          if (item.disabled) {
            return (
              <li key={item.name} className="flex-1 flex justify-center">
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 opacity-50">
                  {item.icon}
                  <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                </div>
              </li>
            );
          }

          if (item.isAnchor) {
            return (
              <li key={item.name} className="flex-1 flex justify-center">
                <a
                  href={item.path}
                  onClick={() => {
                    // Navigate to root first if not on root, then scroll. Simplistic approach for now.
                    if (window.location.pathname !== '/') {
                      window.location.href = item.path;
                    }
                  }}
                  className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors duration-200 active:scale-95"
                >
                  {item.icon}
                  <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                </a>
              </li>
            )
          }

          return (
            <li key={item.name} className="flex-1 flex justify-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 active:scale-95 ${
                    isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default BottomNav;
