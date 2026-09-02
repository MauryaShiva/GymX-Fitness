import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

const MotionNavLink = motion.create(NavLink);

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

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    {
      name: "Search",
      path: "#",
      icon: <Search className="w-6 h-6" />,
      onClick: handleSearchClick,
    },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-surface/90 backdrop-blur-md border-t border-gray-800 z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          item.onClick ? (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors focus:outline-none"
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </button>
          ) : (
            <MotionNavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors focus:outline-none ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                }`
              }
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </MotionNavLink>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
