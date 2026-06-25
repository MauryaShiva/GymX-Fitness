import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleSearchClick = () => {
    navigate('/');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('global-search'));
    }, 100);
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="md:hidden fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800 pt-safe"
    >
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2" onClick={() => navigate('/')}>
          <img src={Logo} alt="GymX Logo" className="w-8 h-8" />
          <span className="text-white font-bold text-lg tracking-tight">GymX</span>
        </div>

        <button
          onClick={handleSearchClick}
          className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </motion.header>
  );
};

export default MobileHeader;
