import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Heart, Info } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 pb-safe bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/4 h-full ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/4 h-full ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <PlaySquare className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">Workouts</span>
        </NavLink>

        {/* Note: In a real app, "Exercises" might link to a dedicated route, or smooth scroll to the exercises section on the Home page.
            For now, we'll link it to "/" and use a click handler to scroll if needed, or just link to home. */}
        <NavLink
          to="/"
          onClick={() => {
            document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/4 h-full ${
              isActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
            }`
          }
        >
          <Dumbbell className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">Exercises</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
