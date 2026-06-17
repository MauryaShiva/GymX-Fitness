import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Activity, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExercisesClick = (e) => {
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
    { name: "Home", path: "/", icon: Home },
    { name: "Exercises", path: "#exercises", icon: Dumbbell, onClick: handleExercisesClick },
    { name: "Workouts", path: "/home-workouts", icon: Activity },
    { name: "Favorites", path: "#favorites", icon: Heart }, // Dummy for now
    { name: "About", path: "#about", icon: User }, // Dummy for now
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return item.onClick ? (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-16 h-full gap-1"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <Icon size={24} className="text-gray-500" />
              </motion.div>
              <span className="text-[10px] text-gray-500 font-medium">
                {item.name}
              </span>
            </button>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive: isNavLinkActive }) =>
                `flex flex-col items-center justify-center w-16 h-full gap-1 ${
                  isNavLinkActive && !item.path.startsWith("#") ? "text-red-500" : "text-gray-500"
                }`
              }
            >
              {({ isActive: isNavLinkActive }) => (
                <>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Icon size={24} className={isNavLinkActive && !item.path.startsWith("#") ? "text-red-500" : ""} />
                  </motion.div>
                  <span className={`text-[10px] font-medium ${isNavLinkActive && !item.path.startsWith("#") ? "text-red-500" : ""}`}>
                    {item.name}
                  </span>
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
