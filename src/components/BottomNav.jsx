import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Calendar, Heart } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-300'
            }`
          }
        >
          <Home size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-300'
            }`
          }
        >
          <Calendar size={24} />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        {/* Scroll to exercises hack for mobile app-like feel */}
        <a
          href="/#exercises"
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-gray-300 transition-colors duration-200"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <Dumbbell size={24} />
          <span className="text-[10px] font-medium">Exercises</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;
