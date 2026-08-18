import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Dumbbell, PlayCircle, Search, Heart } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", path: "#search", icon: Search, onClick: handleSearchClick },
    { name: "Workouts", path: "/home-workouts", icon: PlayCircle },
    { name: "Favorites", path: "/favorites", icon: Heart }, // Placeholder for future
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe bg-[var(--color-surface)]/80 backdrop-blur-lg border-t border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-[var(--color-primary)] rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current/20' : ''}`} />
                <span className="text-[10px] font-medium mt-1">{item.name}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
