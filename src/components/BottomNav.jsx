import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Dumbbell, PlaySquare, Heart, Info } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 pb-safe pb-2 pt-2 px-4 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
              isActive ? "text-red-500 scale-110" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={() => {
            const event = new CustomEvent('execute-search', { detail: '' });
            window.dispatchEvent(event);
            document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 text-gray-400 hover:text-gray-200"
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-[10px] font-medium">Exercises</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
              isActive ? "text-red-500 scale-110" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <PlaySquare className="w-6 h-6" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        {/* Note: Favorites and About routes don't exist yet, so we just use empty or "#" for now, or just disabled visual look */}
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 text-gray-600 cursor-not-allowed">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Favorites</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 text-gray-600 cursor-not-allowed">
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-medium">About</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
