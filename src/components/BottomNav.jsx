import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Activity, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExercisesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <NavLink to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-400">
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center ${isActive ? 'text-red-500' : 'hover:text-gray-200'}`}
            >
              <Home className="h-6 w-6" />
              <span className="text-[10px] mt-1 font-medium">Home</span>
            </motion.div>
          )}
        </NavLink>

        <a href="#exercises" onClick={handleExercisesClick} className="flex flex-col items-center justify-center w-full h-full text-gray-400">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center hover:text-gray-200"
          >
            <Dumbbell className="h-6 w-6" />
            <span className="text-[10px] mt-1 font-medium">Exercises</span>
          </motion.div>
        </a>

        <NavLink to="/home-workouts" className="flex flex-col items-center justify-center w-full h-full text-gray-400">
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center ${isActive ? 'text-red-500' : 'hover:text-gray-200'}`}
            >
              <Activity className="h-6 w-6" />
              <span className="text-[10px] mt-1 font-medium">Workouts</span>
            </motion.div>
          )}
        </NavLink>

        {/* Placeholders for future features */}
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-600 opacity-50 cursor-not-allowed">
          <Heart className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">Favorites</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full text-gray-600 opacity-50 cursor-not-allowed">
          <Info className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">About</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
