import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

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
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Search", action: handleSearchClick, icon: <Search size={24} /> },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar size={24} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          if (item.action) {
            return (
              <li key={item.name} className="flex-1">
                <button
                  onClick={item.action}
                  className="w-full flex flex-col items-center justify-center gap-1 text-text-secondary hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              </li>
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                className={`w-full flex flex-col items-center justify-center gap-1 transition-colors relative h-full ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.icon}
                <span className="text-[10px] font-medium">{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
