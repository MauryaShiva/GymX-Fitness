import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile search overlay state
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
    setBodyParts(["all", ...bodyPartNames]);

    // Listen for custom event to open search
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      // Focus input after animation
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    };

    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Close mobile search when body gets locked to prevent scrolling issues
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSearchOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    setIsMobileSearchOpen(false);
    onSearch(suggestion);

    // Slight delay for mobile so overlay closes before scrolling
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      setIsMobileSearchOpen(false);
      onSearch(search);
      setSuggestions([]);

      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (search) {
      // In a real app, use toast instead of alert
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
    setSuggestions([]);
  };

  // The inner content rendered normally for desktop, and conditionally wrapped for mobile overlay
  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full max-w-3xl ${isMobile ? 'mb-4' : 'mb-16'}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>

      <input
        ref={isMobile ? searchInputRef : null}
        className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-24 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles, equipment..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />

      {/* Search Button (Hidden on very small screens, visible on md+) */}
      <button
        className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className={`absolute ${isMobile ? 'top-[72px]' : 'top-full mt-2'} w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-700 last:border-0 flex items-center"
            >
              <Search className="w-4 h-4 mr-3 opacity-50" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* --- Desktop Search Section --- */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>

        {renderSearchContent(false)}

        {/* Horizontal Scrollbar for Body Parts */}
        <div className="relative w-full max-w-7xl mt-8">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* --- Mobile Categories Section (always visible) --- */}
      <section className="md:hidden flex flex-col items-center mt-8 p-4 text-center">
         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Explore Categories
        </h2>
        <div className="relative w-full overflow-hidden">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* --- Mobile Search Full Screen Overlay --- */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-gray-900 flex flex-col pt-safe-top"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Search</h2>
              <button
                onClick={closeMobileSearch}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Input Area */}
            <div className="p-4">
              {renderSearchContent(true)}

              {/* Recent Searches (Mockup logic for visual completeness in mobile) */}
              {!search && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                    Suggested Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cardio', 'Chest', 'Back', 'Legs', 'Dumbbell'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleSuggestionClick(tag)}
                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
