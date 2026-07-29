import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, User, Dumbbell } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <Home size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-text-primary"
        >
          <Search size={24} />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <Dumbbell size={24} />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <Heart size={24} />
          <span className="text-[10px] font-medium">Favorites</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`
          }
        >
          <User size={24} />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
