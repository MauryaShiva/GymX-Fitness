import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const MobileHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md px-4 py-3 flex justify-between items-center shadow-sm md:hidden pt-safe">
      <NavLink to="/" className="flex items-center">
        <img src={Logo} alt="GymX Logo" className="w-10 h-10" />
        <span className="ml-2 font-bold text-[#3A1212] text-xl">GymX</span>
      </NavLink>
      <button
        onClick={() => {
          // Dispatch global search event to open overlay
          window.dispatchEvent(new CustomEvent("global-search"));
        }}
        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none"
      >
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
};

export default MobileHeader;
