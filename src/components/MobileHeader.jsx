import React from "react";
import { Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const MobileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      // Slight delay to allow navigation to complete before dispatching the event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("global-search"));
      }, 100);
    } else {
      window.dispatchEvent(new CustomEvent("global-search"));
    }
  };

  return (
    <header className="md:hidden sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 pt-safe">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
          <img src={Logo} alt="GymX Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-lg tracking-tight">GymX</span>
        </Link>
        <button
          onClick={handleSearchClick}
          className="p-2 text-gray-300 hover:text-white active:scale-90 transition-transform bg-gray-800/50 rounded-full"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
