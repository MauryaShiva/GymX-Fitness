import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Dumbbell, User } from "lucide-react";
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
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Search", path: "#search", icon: <Search size={24} />, onClick: handleSearchClick },
    { name: "Workouts", path: "/home-workouts", icon: <Dumbbell size={24} /> },
    { name: "Profile", path: "#profile", icon: <User size={24} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && !item.onClick;

          return (
            <div key={item.name} className="flex-1">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="w-full flex flex-col items-center justify-center space-y-1 text-text-secondary hover:text-primary transition-colors"
                >
                  <div className="relative">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className="w-full flex flex-col items-center justify-center space-y-1"
                >
                  <div className={`relative ${isActive ? "text-primary" : "text-text-secondary"}`}>
                    {item.icon}
                    {isActive && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-text-secondary"}`}>
                    {item.name}
                  </span>
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
