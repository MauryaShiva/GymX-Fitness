import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Search, Info } from "lucide-react";
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
    { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
    { name: "Search", path: "#", icon: Search, onClick: handleSearchClick },
    { name: "About", path: "/about", icon: Info }, // Added a placeholder for 'about' just for UI completeness if needed, or point elsewhere
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-border pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && !item.onClick;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.name}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center justify-center w-16 h-full transition-colors ${
                      isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110 transition-transform" : ""}`} />
                      <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                        {item.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -top-1 w-8 h-1 bg-primary rounded-b-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
