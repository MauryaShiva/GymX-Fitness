import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Search } from "lucide-react";
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
    { name: "Workouts", path: "/home-workouts", icon: Calendar },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-lg border-t border-gray-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return item.path ? (
            <NavLink
              key={item.name}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          ) : (
            <button
              key={item.name}
              onClick={item.action}
              className="relative flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors focus:outline-none"
            >
              <Icon className="w-6 h-6 mb-1 text-text-secondary" />
              <span className="text-[10px] font-medium text-text-secondary">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
