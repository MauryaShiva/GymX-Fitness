import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PlaySquare, Info } from "lucide-react";

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
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Search", action: handleSearchClick, icon: <Search className="w-6 h-6" /> },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare className="w-6 h-6" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-t border-gray-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const isActive = item.path === location.pathname;

          if (item.action) {
            return (
              <motion.button
                key={index}
                onClick={item.action}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center w-full h-full text-text-secondary"
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              </motion.button>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center ${isActive ? "text-primary" : "text-text-secondary"}`}
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
