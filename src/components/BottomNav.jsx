import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, CalendarHeart, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const tabs = [
    { name: 'Home', path: '/', icon: <Home size={24} /> },
    { name: 'Workouts', path: '/home-workouts', icon: <CalendarHeart size={24} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md border-t border-surface-light pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute bottom-0 w-8 h-1 bg-primary rounded-t-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
