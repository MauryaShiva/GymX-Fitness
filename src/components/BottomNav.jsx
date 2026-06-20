import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Info } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <Home size={24} />
          <span className="text-xs font-medium">Home</span>
        </NavLink>
        <NavLink
          to="/#exercises"
          onClick={() => {
            const el = document.getElementById("exercises");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <Dumbbell size={24} />
          <span className="text-xs font-medium">Exercises</span>
        </NavLink>
        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <PlaySquare size={24} />
          <span className="text-xs font-medium">Workouts</span>
        </NavLink>
        <NavLink
          to="/#about"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <Info size={24} />
          <span className="text-xs font-medium">About</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
