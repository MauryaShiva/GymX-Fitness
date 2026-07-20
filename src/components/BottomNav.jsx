import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If already on home, just dispatch the event
      window.dispatchEvent(new Event("open-search"));
    } else {
      // If elsewhere, navigate to home with query param
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", action: handleSearchClick, icon: Search },
    { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe bg-white/80 dark:bg-surface/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return item.action ? (
            <button
              key={index}
              onClick={item.action}
              className={`flex flex-col items-center justify-center w-full h-full relative text-gray-500 dark:text-gray-400`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full relative transition-colors duration-300 ${
                  isActive
                    ? "text-red-500 dark:text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-6 h-6 mb-1 relative z-10" />
                  <span className="text-[10px] font-medium relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 bg-red-50 dark:bg-primary/10 rounded-2xl m-1"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
