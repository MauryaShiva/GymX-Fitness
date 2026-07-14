import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, PlayCircle, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/");
    setTimeout(() => {
      window.dispatchEvent(new Event("open-search"));
    }, 100);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Workouts", path: "/home-workouts", icon: PlayCircle },
    { name: "Search", action: handleSearchClick, icon: Dumbbell },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe md:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return item.path ? (
            <NavLink
              key={index}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-full h-full text-text-secondary"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 flex flex-col items-center ${
                  isActive ? "text-primary" : ""
                }`}
              >
                <Icon
                  size={24}
                  className={`mb-1 ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
                <span className="text-[10px] font-medium">{item.name}</span>
              </motion.div>
            </NavLink>
          ) : (
            <button
              key={index}
              onClick={item.action}
              className="relative flex flex-col items-center justify-center w-full h-full text-text-secondary focus:outline-none"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative z-10 flex flex-col items-center"
              >
                <Icon size={24} className="mb-1 stroke-2" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
