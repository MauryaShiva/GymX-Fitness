import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Search, Info } from "lucide-react";

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
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "#exercises", icon: <Dumbbell className="w-6 h-6" />, label: "Exercises", onClick: handleSearchClick },
    { to: "/home-workouts", icon: <Calendar className="w-6 h-6" />, label: "Workouts" },
    { to: "#favorites", icon: <Search className="w-6 h-6" />, label: "Search", onClick: handleSearchClick },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 pb-safe md:hidden">
      <ul className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          if (item.onClick) {
            return (
              <li key={index} className="flex-1">
                <button
                  onClick={item.onClick}
                  className="w-full flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors"
                >
                  {item.icon}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              </li>
            )
          }

          return (
            <li key={index} className="flex-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex flex-col items-center justify-center space-y-1 transition-colors ${
                    isActive ? "text-primary" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
