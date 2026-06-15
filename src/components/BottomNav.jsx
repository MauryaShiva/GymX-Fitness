import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Search, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new Event("global-search"));
      }, 100);
    } else {
      window.dispatchEvent(new Event("global-search"));
    }
  };

  const navItems = [
    { name: "Home", icon: <Home className="w-6 h-6" />, path: "/" },
    {
      name: "Search",
      icon: <Search className="w-6 h-6" />,
      path: "#search",
      onClick: handleSearchClick,
    },
    {
      name: "Workouts",
      icon: <Dumbbell className="w-6 h-6" />,
      path: "/home-workouts",
    },
    {
      name: "About",
      icon: <Info className="w-6 h-6" />,
      path: "#about", // Just a placeholder for layout
      onClick: (e) => {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      },
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 pb-safe pt-2 px-6">
      <div className="flex justify-between items-center h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && item.path !== "#search" && item.path !== "#about";

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? "text-red-500" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-red-500 rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div whileTap={{ scale: 0.9 }}>{item.icon}</motion.div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
