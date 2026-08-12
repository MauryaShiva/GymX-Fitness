import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Dumbbell, Search, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
    { name: "Search", path: "#", icon: Search, onClick: handleSearchClick },
    { name: "Favorites", path: "/favorites", icon: Heart }, // Placeholder
    { name: "Profile", path: "/profile", icon: User }, // Placeholder
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass pb-safe border-t border-gray-800">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && item.path !== "#";

          return item.onClick ? (
            <motion.button
              key={item.name}
              onClick={item.onClick}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-white transition-colors"
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </motion.button>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center transition-colors ${
                  isActive ? "text-primary" : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-6 w-6 mb-1 ${isActive ? "text-primary" : ""}`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {item.name}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
