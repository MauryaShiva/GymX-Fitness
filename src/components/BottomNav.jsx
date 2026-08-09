import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PlaySquare } from "lucide-react"; // Using lucide-react icons

const MotionNavLink = motion.create(NavLink);

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
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { onClick: handleSearchClick, icon: <Search className="w-6 h-6" />, label: "Search" },
    { to: "/home-workouts", icon: <PlaySquare className="w-6 h-6" />, label: "Workouts" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item, index) => (
          item.onClick ? (
            <motion.button
              key={index}
              onClick={item.onClick}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
          ) : (
            <MotionNavLink
              key={index}
              to={item.to}
              whileTap={{ scale: 0.9 }}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </MotionNavLink>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
