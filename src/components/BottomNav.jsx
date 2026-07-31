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
    { name: 'Home', path: '/', icon: Home },
    { name: 'Workouts', path: '/home-workouts', icon: PlaySquare },
    { name: 'Search', path: '#search', icon: Search, onClick: handleSearchClick },
    { name: 'Exercises', path: '#exercises', icon: Dumbbell, onClick: (e) => {
        if (location.pathname !== '/') {
            navigate('/#exercises');
        } else {
            document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
        }
    }},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <React.Fragment key={item.name}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center w-full h-full relative"
                >
                  <item.icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`text-[10px] mt-1 ${isActive ? 'text-primary font-medium' : 'text-text-secondary'}`}>
                    {item.name}
                  </span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className="flex flex-col items-center justify-center w-full h-full relative"
                >
                  <item.icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`text-[10px] mt-1 ${isActive ? 'text-primary font-medium' : 'text-text-secondary'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full"
                    />
                  )}
                </NavLink>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
