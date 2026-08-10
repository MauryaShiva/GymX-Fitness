import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, PlaySquare } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/?search=true');
    } else {
      window.dispatchEvent(new Event('open-search'));
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', action: handleSearchClick, icon: Search },
    { name: 'Workouts', path: '/home-workouts', icon: PlaySquare },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-t border-gray-800 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={item.name}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-primary transition-colors"
              >
                <Icon size={24} />
                <span className="text-[10px] mt-1">{item.name}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={24} className={isActive ? 'mb-1' : ''} />
                  <span className="text-[10px] mt-1">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
