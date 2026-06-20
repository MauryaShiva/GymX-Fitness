import React from "react";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";

const MobileHeader = ({ onSearchClick }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 pt-safe transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="GymX Logo" className="h-8 w-auto" />
        </Link>
        <button
          onClick={onSearchClick}
          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Open search"
        >
          <Search size={20} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
