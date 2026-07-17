import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Dumbbell, PlaySquare, Search, Info } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Workouts", path: "/home-workouts", icon: PlaySquare },
    { name: "Search", path: "#search", icon: Search, onClick: handleSearchClick },
    { name: "Exercises", path: "/#exercises", icon: Dumbbell,
      onClick: (e) => {
        if (location.pathname === "/") {
          e.preventDefault();
          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/#exercises");
        }
      }
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path && item.path !== "#search";

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="relative flex flex-col items-center">
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "font-bold" : ""}`}>
                  {item.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
