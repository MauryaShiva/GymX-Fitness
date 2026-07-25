import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Search, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Exercises", icon: <Dumbbell size={24} />, path: "/?search=true", onClick: handleSearchClick },
    { name: "Workouts", icon: <PlaySquare size={24} />, path: "/home-workouts" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full z-50 bg-white/80 dark:bg-surface/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="flex justify-around items-center h-[70px] px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.name === 'Exercises' && location.search.includes('search=true'));

          return (
            <div key={item.name} className="flex-1 flex justify-center">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="relative flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-red-500 transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-[1px] w-12 h-1 bg-red-500 rounded-b-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110 text-red-500' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-red-500' : ''}`}>
                    {item.name}
                  </span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className="relative flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-red-500 transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-[1px] w-12 h-1 bg-red-500 rounded-b-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110 text-red-500' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-red-500' : ''}`}>
                    {item.name}
                  </span>
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
