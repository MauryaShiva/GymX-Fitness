import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.dispatchEvent(new Event('open-search'));
    } else {
      navigate('/?search=true');
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Search', icon: Search, action: handleSearchClick },
    { name: 'Workouts', icon: Calendar, path: '/home-workouts' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-surface/90 backdrop-blur-md border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.path ? location.pathname === item.path : false;

          return item.action ? (
            <button
              key={item.name}
              onClick={item.action}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <item.icon size={24} />
              </motion.div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <item.icon size={24} />
              </motion.div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
