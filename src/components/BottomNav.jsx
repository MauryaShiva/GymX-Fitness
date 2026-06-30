import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, PlayCircle, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Dumbbell, label: 'Exercises', path: '/#exercises' },
  { icon: PlayCircle, label: 'Workouts', path: '/home-workouts' },
];

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <ul className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <li key={item.label} className="w-full">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 ${
                  isActive ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'
                }`
              }
              // For anchors like /#exercises we might need custom handling, but NavLink handles standard routes well.
              // A simple click handler for hash links if they are active:
              onClick={(e) => {
                if (item.path.includes('#')) {
                  const id = item.path.split('#')[1];
                  const element = document.getElementById(id);
                  if (element) {
                     element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: isActive ? -2 : 0 }}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
