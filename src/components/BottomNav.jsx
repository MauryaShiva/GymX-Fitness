import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, PlaySquare } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Exercises", path: "/#exercises", icon: Dumbbell },
  { name: "Workouts", path: "/home-workouts", icon: PlaySquare },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    if (path === "/#exercises") {
      e.preventDefault();
      // If not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Small delay to allow navigation and rendering before scrolling
        setTimeout(() => {
          document.getElementById("search-exercises-section")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.getElementById("search-exercises-section")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={({ isActive }) => {
                // Manually handle active state for hash routing since React Router doesn't do it out of the box for hashes
                const isHashActive = item.path === "/#exercises" && location.hash === "#exercises";
                const isReallyActive = (isActive && item.path !== "/#exercises") || isHashActive;
                return `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isReallyActive ? "text-red-500" : "text-gray-500 hover:text-gray-900"
                }`;
              }}
            >
              {({ isActive }) => {
                const isHashActive = item.path === "/#exercises" && location.hash === "#exercises";
                const isReallyActive = (isActive && item.path !== "/#exercises") || isHashActive;
                return (
                  <>
                    <motion.div
                      animate={isReallyActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={isReallyActive ? 2.5 : 2} />
                    </motion.div>
                    <span className={`text-[10px] font-medium ${isReallyActive ? "font-bold" : ""}`}>
                      {item.name}
                    </span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
