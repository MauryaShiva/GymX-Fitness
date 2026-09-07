import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Dumbbell, Calendar, Heart, Info, Search } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  };

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/exercises", icon: Dumbbell, label: "Exercises", action: handleSearchClick }, // Using search as a proxy for exercises for now, or could scroll to #exercises
    { to: "/home-workouts", icon: Calendar, label: "Workouts" },
    // { to: "/favorites", icon: Heart, label: "Favorites" }, // Placeholder if added later
    // { to: "/about", icon: Info, label: "About" }, // Placeholder if added later
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-gray-950/90 backdrop-blur-lg border-t border-gray-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          item.action ? (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-red-500 transition-colors"
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? "text-red-500" : "text-gray-400 hover:text-red-400"
                }`
              }
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
