import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Dumbbell } from "lucide-react";

const BottomNav = () => {
  const triggerSearch = (e) => {
    e.preventDefault();
    // Navigate home first if we're not there, since search component is only on home
    if (window.location.pathname !== "/") {
      window.location.href = "/?search=true";
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 ${
              isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={triggerSearch}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-text-primary transition-colors duration-300"
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 ${
              isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
            }`
          }
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
