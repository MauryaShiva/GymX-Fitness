import React from "react";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const MobileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new Event("global-search"));
      }, 100);
    } else {
      window.dispatchEvent(new Event("global-search"));
    }
  };

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 pt-safe transition-transform duration-300">
      <div className="flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="GymX Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-gray-900">GymX</span>
        </Link>
        <button
          onClick={handleSearchClick}
          className="p-2 bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
          aria-label="Search exercises"
        >
          <Search size={20} className="text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
