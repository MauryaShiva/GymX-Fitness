import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionNavLink = motion.create(NavLink);

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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 pb-safe pb-2">
      <div className="flex justify-around items-center h-16 px-4">
        <MotionNavLink
          to="/"
          whileTap={{ scale: 0.9 }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive && location.search !== '?search=true' ? 'text-red-600' : 'text-gray-500'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </MotionNavLink>

        <motion.button
          onClick={handleSearchClick}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            location.search === '?search=true' ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Search</span>
        </motion.button>

        <MotionNavLink
          to="/home-workouts"
          whileTap={{ scale: 0.9 }}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-red-600' : 'text-gray-500'
            }`
          }
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-[10px] font-medium">Workouts</span>
        </MotionNavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
