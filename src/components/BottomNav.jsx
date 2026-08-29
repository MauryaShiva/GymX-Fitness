import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, PlaySquare, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden pb-safe bg-surface/90 backdrop-blur-md border-t border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full relative ${
              isActive ? "text-primary" : "text-text-secondary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home className="w-6 h-6 z-10" />
              <span className="text-[10px] font-medium mt-1 z-10">Home</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg m-2"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </>
          )}
        </NavLink>

        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full relative ${
              isActive ? "text-primary" : "text-text-secondary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <PlaySquare className="w-6 h-6 z-10" />
              <span className="text-[10px] font-medium mt-1 z-10">Workouts</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg m-2"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
