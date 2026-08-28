import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const navItems = [
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home", exact: true },
    { to: "/home-workouts", icon: <Dumbbell className="w-6 h-6" />, label: "Workouts", exact: false },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: isActive ? -2 : 0 }}
                >
                  {item.icon}
                </motion.div>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            <Search className="w-6 h-6" />
          </motion.div>
          <span className="text-[10px] mt-1 font-medium">Search</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
