import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={24} />, label: "Home", to: "/" },
    { icon: <Dumbbell size={24} />, label: "Exercises", to: "/#exercises" },
    { icon: <Calendar size={24} />, label: "Workouts", to: "/home-workouts" },
    { icon: <Heart size={24} />, label: "Favorites", to: "#" },
    { icon: <Info size={24} />, label: "About", to: "#" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-md border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            onClick={(e) => {
               if (item.to.includes("#")) {
                   e.preventDefault();
                   if (item.to === "/#exercises") {
                     // Since Exercises section is in Home, we scroll or navigate
                     if (window.location.pathname === "/") {
                         document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                     } else {
                         // Fallback using navigate to preserve SPA behavior
                         navigate("/");
                         setTimeout(() => {
                           document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                         }, 100);
                     }
                   } else {
                     // Dummy action for favorites and about for now
                   }
               }
            }}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive && item.to !== "#" && item.to !== "/#exercises" ? "text-red-600" : "text-gray-500 hover:text-red-500"
              }`
            }
          >
            {() => (
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center"
                >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.label}</span>
                </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
