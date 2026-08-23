import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Heart, User, Dumbbell } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Workouts", icon: <Dumbbell size={24} />, path: "/home-workouts" },
    { name: "Search", icon: <Search size={24} />, action: "search" },
    // Placeholder tabs for a complete app feel
    { name: "Favorites", icon: <Heart size={24} />, path: "/favorites" },
    { name: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  const handleAction = (item) => {
    if (item.action === "search") {
      if (location.pathname !== "/") {
        navigate("/?search=true");
      } else {
        window.dispatchEvent(new Event("open-search"));
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-gray-700/50 pb-safe z-50"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <React.Fragment key={item.name}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  className="flex flex-col items-center justify-center w-full h-full relative"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-text-secondary"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.name}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                    />
                  )}
                </NavLink>
              ) : (
                <button
                  onClick={() => handleAction(item)}
                  className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center justify-center space-y-1"
                  >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.name}</span>
                  </motion.div>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;
