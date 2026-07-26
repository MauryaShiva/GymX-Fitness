import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, PlaySquare, Info } from "lucide-react";
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
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Exercises", path: "#search", icon: <Search className="w-6 h-6" />, onClick: handleSearchClick },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare className="w-6 h-6" /> },
    { name: "About", path: "#", icon: <Info className="w-6 h-6" />, onClick: (e) => e.preventDefault() },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute -bottom-2 left-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
