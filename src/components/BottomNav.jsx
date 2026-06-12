import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CalendarDays } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 z-50 w-full bg-gray-900/90 backdrop-blur-md pb-safe md:hidden flex justify-around items-center py-2 border-t border-gray-800 shadow-2xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full py-1 ${
            isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
          }`
        }
      >
        <Home className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>
      <NavLink
        to="/home-workouts"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full py-1 ${
            isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
          }`
        }
      >
        <CalendarDays className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">Workouts</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
