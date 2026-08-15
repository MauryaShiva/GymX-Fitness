import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, PlayCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const navItems = [
    { to: "/", icon: <Home size={24} />, label: "Home", exact: true },
    {
      to: "/search", // Not a real route, handled via click
      icon: <Search size={24} />,
      label: "Search",
      onClick: handleSearchClick,
    },
    { to: "/home-workouts", icon: <PlayCircle size={24} />, label: "Workouts" },
    { to: "#", icon: <Info size={24} />, label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/80 backdrop-blur-xl border-t border-gray-800 pb-safe"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => {
          if (item.onClick) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                }`
              }
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
