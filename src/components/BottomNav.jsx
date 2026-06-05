import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, PlayCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: <Home size={24} />, label: 'Home' },
    { to: '/home-workouts', icon: <PlayCircle size={24} />, label: 'Workouts' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
