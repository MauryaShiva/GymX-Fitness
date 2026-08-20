import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, PlaySquare } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className={`flex flex-col items-center justify-center transition-colors duration-300 z-10 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="text-[10px] mt-1 font-medium">{tab.name}</span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl m-1"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
