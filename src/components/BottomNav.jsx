import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Dumbbell, Search } from 'lucide-react';

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
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Search', action: handleSearchClick, icon: Search },
    { name: 'Workouts', path: '/home-workouts', icon: Dumbbell },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 w-full z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          item.path ? (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <item.icon size={24} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ) : (
            <button
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <item.icon size={24} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          )
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
