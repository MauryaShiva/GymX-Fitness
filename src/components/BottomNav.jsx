import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Heart, Info } from "lucide-react";

const BottomNav = () => {
  const tabs = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Workouts", path: "/home-workouts", icon: <PlaySquare className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
                isActive
                  ? "text-red-500 scale-110"
                  : "text-gray-400 hover:text-gray-300 active:scale-95"
              }`
            }
          >
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
