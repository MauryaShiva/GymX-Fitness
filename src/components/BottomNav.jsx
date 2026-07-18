import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Dumbbell, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?search=true');
    } else {
      window.dispatchEvent(new Event('open-search'));
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-4">
        <NavLink to="/" className="flex flex-col items-center justify-center w-full h-full relative group">
          {({ isActive }) => (
            <>
              <Home className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-400'}`} />
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-400'}`}>Home</span>
              {isActive && (
                <motion.div layoutId="bottomNavIndicator" className="absolute top-0 w-8 h-1 bg-red-500 rounded-b-full" />
              )}
            </>
          )}
        </NavLink>

        <button onClick={handleSearchClick} className="flex flex-col items-center justify-center w-full h-full relative group">
          <Search className="w-6 h-6 text-gray-500 group-hover:text-red-400 transition-colors duration-300" />
          <span className="text-[10px] mt-1 font-medium text-gray-500 group-hover:text-red-400 transition-colors duration-300">Search</span>
        </button>

        <NavLink to="/home-workouts" className="flex flex-col items-center justify-center w-full h-full relative group">
          {({ isActive }) => (
            <>
              <PlayCircle className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-400'}`} />
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-400'}`}>Workouts</span>
              {isActive && (
                <motion.div layoutId="bottomNavIndicator" className="absolute top-0 w-8 h-1 bg-red-500 rounded-b-full" />
              )}
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
