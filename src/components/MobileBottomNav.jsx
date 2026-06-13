import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, CalendarHeart } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                <Home size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium">Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
              isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                <CalendarHeart size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium">Workouts</span>
            </>
          )}
        </NavLink>

        {/* You can add more tabs here as the app grows */}
        <button
          onClick={() => {
            if (window.location.pathname !== '/') {
              window.location.href = '/#exercises';
            } else {
              const element = document.getElementById('exercises');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
             <Dumbbell size={24} strokeWidth={2} />
          </motion.div>
          <span className="text-[10px] font-medium">Exercises</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
