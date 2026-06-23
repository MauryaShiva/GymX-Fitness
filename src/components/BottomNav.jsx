import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const handleScrollToExercises = (e) => {
    // NavLink handles changing route, we just need to scroll once there
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-md border-t border-gray-800 pb-safe"
    >
      <div className="flex items-center justify-around h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/"
          onClick={handleScrollToExercises}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors text-text-secondary hover:text-text-primary"
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-[10px] font-medium">Exercises</span>
        </NavLink>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        {/* Placeholder for generic tab, clicking takes to top of home or just inactive for now to match UI */}
        <div className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors text-text-secondary cursor-not-allowed opacity-50">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Favorites</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNav;
