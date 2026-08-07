import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Calendar, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", action: handleSearchClick, icon: Search },
    { name: "Workouts", path: "/home-workouts", icon: Calendar },
    { name: "Favorites", path: "#", icon: Heart }, // Placeholder
    { name: "Profile", path: "#", icon: User }, // Placeholder
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-1/5 text-text-secondary hover:text-primary transition-colors focus:outline-none"
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Icon className="h-6 w-6 mb-1" />
                </motion.div>
                <span className="text-[10px]">{item.name}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              className={() =>
                `flex flex-col items-center justify-center w-1/5 transition-colors focus:outline-none ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <Icon className={`h-6 w-6 mb-1 ${isActive ? "text-primary" : ""}`} />
              </motion.div>
              <span className="text-[10px]">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
