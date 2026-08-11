import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Dumbbell, Search, Bookmark, User } from "lucide-react";

// Use motion.create for wrapping Link
const MotionLink = motion.create(Link);

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const tabs = [
    { name: "Home", path: "/", icon: Home },
    { name: "Exercises", path: "/#exercises", icon: Dumbbell, isAnchor: true },
    { name: "Search", action: handleSearchClick, icon: Search },
    { name: "Workouts", path: "/home-workouts", icon: Bookmark },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path && !tab.isAnchor;
          const Icon = tab.icon;

          if (tab.action) {
            return (
              <motion.button
                key={tab.name}
                onClick={tab.action}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{tab.name}</span>
              </motion.button>
            );
          }

          if (tab.isAnchor) {
            return (
              <motion.a
                key={tab.name}
                href={tab.path}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{tab.name}</span>
              </motion.a>
            );
          }

          return (
            <MotionLink
              key={tab.name}
              to={tab.path}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {tab.name}
              </span>
            </MotionLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
