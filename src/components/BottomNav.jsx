import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Search } from "lucide-react";
import { motion } from "framer-motion";

const MotionNavLink = motion.create(NavLink);

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
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/home-workouts", icon: <Dumbbell className="w-6 h-6" />, label: "Workouts" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <MotionNavLink
            key={item.label}
            to={item.to}
            whileTap={{ scale: 0.9 }}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-primary" : "text-text-secondary"
              }`
            }
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </MotionNavLink>
        ))}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-primary transition-colors"
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Search</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default BottomNav;
