import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Dumbbell, Search, Heart, Info } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Exercises", path: "/?search=true", icon: Search },
  { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    if (path === "/?search=true") {
      e.preventDefault();
      if (location.pathname === "/") {
        window.dispatchEvent(new Event("open-search"));
      } else {
        navigate("/?search=true");
      }
    }
  };

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-t border-gray-800 pb-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === "/?search=true" && location.search === "?search=true");

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className="flex flex-col items-center justify-center w-16 h-full gap-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center p-1 rounded-xl transition-colors ${
                  isActive ? "text-[#03dac6]" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon size={24} className={isActive ? "fill-current/20" : ""} />
                <span className="text-[10px] font-medium mt-1">{item.name}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
