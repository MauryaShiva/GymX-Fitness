import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Search, Activity } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Workouts", path: "/home-workouts", icon: Activity },
    { name: "Search", path: "#search", icon: Search, onClick: handleSearchClick },
    { name: "Exercises", path: "/", icon: Dumbbell, onClick: () => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
            }, 500);
        } else {
            document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
        }
    } },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe pt-2 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-2">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && !item.onClick;
          const Icon = item.icon;

          return (
            <li key={item.name} className="flex-1">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="w-full flex flex-col items-center justify-center p-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon size={24} className="mb-1" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex flex-col items-center justify-center p-2 transition-colors relative ${
                      isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={24} className="mb-1" />
                      <span className="text-[10px] font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -top-2 w-8 h-1 bg-primary rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
