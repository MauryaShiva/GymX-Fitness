import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Activity, Heart, Info, Search } from 'lucide-react';
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

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '#search', icon: Search, label: 'Search', onClick: handleSearchClick },
    { to: '/home-workouts', icon: Activity, label: 'Workouts' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;


          return item.onClick ? (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors focus:outline-none"
            >
              <Icon size={24} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-full h-full transition-colors focus:outline-none ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon size={24} className={isActive ? 'mt-1' : ''} />
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
