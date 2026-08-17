import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Heart, User, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

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
    { name: "Home", path: "/", icon: Home },
    { name: "Workouts", path: "/home-workouts", icon: Dumbbell },
    { name: "Search", path: "#search", icon: Search, onClick: handleSearchClick },
    { name: "Favorites", path: "#", icon: Heart }, // Placeholder
    { name: "Profile", path: "#", icon: User }, // Placeholder
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && !item.onClick;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.name}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="relative flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon size={24} className="mb-1" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center justify-center w-full h-full transition-colors ${
                      isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -top-[1px] w-8 h-[3px] bg-primary rounded-b-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <Icon size={24} className="mb-1" />
                      <span className="text-[10px] font-medium">{item.name}</span>
                    </>
                  )}
                </NavLink>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
