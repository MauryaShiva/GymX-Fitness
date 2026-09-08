import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, CalendarDays, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", action: handleSearchClick, icon: Search },
    { name: "Workouts", path: "/home-workouts", icon: CalendarDays },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe glass border-t border-white/5 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const isActive = item.path && location.pathname === item.path;
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={item.name}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-16 gap-1 relative focus:outline-none"
              >
                <div className="relative p-2 rounded-full text-text-secondary transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-text-secondary">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center w-16 gap-1 relative focus:outline-none"
            >
              <div
                className={`relative p-2 rounded-full transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : ""}`} />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
