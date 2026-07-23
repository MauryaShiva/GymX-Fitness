import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, HeartPulse, Video } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { to: "/", icon: Home, label: "Home", exact: true },
    { to: "#search", icon: Search, label: "Search", onClick: handleSearchClick },
    { to: "/home-workouts", icon: Video, label: "Workouts" },
    { to: "/favorites", icon: HeartPulse, label: "Favorites" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-gray-800 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <React.Fragment key={index}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-full h-full transition-colors relative ${
                      isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -top-[1px] w-12 h-1 bg-primary rounded-b-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
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
