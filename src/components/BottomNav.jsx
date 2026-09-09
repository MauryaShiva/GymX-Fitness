import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", action: handleSearchClick, icon: Search },
    { name: "Workouts", path: "/home-workouts", icon: PlaySquare },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-surface)]/90 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
      <ul className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          const content = (
            <div className="flex flex-col items-center justify-center w-full h-full relative space-y-1">
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1 w-8 h-1 bg-red-500 rounded-b-md"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                size={22}
                className={`transition-colors duration-200 ${
                  isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-200"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-200"
                }`}
              >
                {item.name}
              </span>
            </div>
          );

          if (item.action) {
            return (
              <li key={item.name} className="flex-1">
                <button
                  onClick={item.action}
                  className="w-full h-full flex items-center justify-center group py-2"
                >
                  {content}
                </button>
              </li>
            );
          }

          return (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                className="w-full h-full flex items-center justify-center group py-2"
              >
                {content}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
