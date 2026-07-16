import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, Info } from "lucide-react";

const BottomNav = () => {
  const tabs = [
    { name: "Home", path: "/", icon: Home },
    { name: "Workouts", path: "/home-workouts", icon: Calendar },
    // Adding placeholder tabs to match typical fitness apps
    // They can route back to home or a specific section for now.
    { name: "Exercises", path: "/?search=true", icon: Dumbbell },
    { name: "Favorites", path: "/#favorites", icon: Heart },
    { name: "About", path: "/#about", icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 backdrop-blur-xl bg-surface border-t border-gray-800 md:hidden flex justify-around items-center pb-safe pt-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 w-16 h-16 transition-all duration-300 ${
                isActive && (tab.path === "/" || tab.path === "/home-workouts")
                  ? "text-red-500 scale-110"
                  : "text-gray-400 hover:text-gray-200 hover:scale-105"
              }`
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{tab.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
