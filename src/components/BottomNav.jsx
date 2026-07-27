import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, PlaySquare, Search } from 'lucide-react';
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
    { to: '/', icon: Home, label: 'Home', isAction: false },
    { to: '/exercises', icon: Dumbbell, label: 'Exercises', isAction: true },
    { to: '/home-workouts', icon: PlaySquare, label: 'Workouts', isAction: false },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          if (item.isAction) {
            return (
              <button
                key="search"
                onClick={handleSearchClick}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-primary transition-colors"
              >
                <Search size={24} />
                <span className="text-[10px] font-medium">Search</span>
              </button>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={24} className={isActive ? 'text-primary' : ''} />
                  <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
