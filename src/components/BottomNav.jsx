import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Dumbbell, Search, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-surface/90 backdrop-blur-lg border-t border-gray-800 md:hidden pb-safe">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <item.icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} />
                </motion.div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Search Action */}
        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-16 gap-1 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            <Search className="w-6 h-6" />
          </motion.div>
          <span className="text-[10px] font-medium">Search</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
