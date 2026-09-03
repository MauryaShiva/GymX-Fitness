import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Dumbbell, User } from "lucide-react";
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
    { to: "/", icon: <Home size={24} />, label: "Home", exact: true },
    {
      onClick: handleSearchClick,
      icon: <Search size={24} />,
      label: "Search",
    },
    { to: "/home-workouts", icon: <Dumbbell size={24} />, label: "Workouts" },
    { to: "#", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItems.map((item, index) => {
          if (item.onClick) {
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.9 }}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-primary transition-colors"
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">
                  {item.label}
                </span>
              </motion.button>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 h-full transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  {item.icon}
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
