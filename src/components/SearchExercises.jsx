import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
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

    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  // Prevent background scrolling when mobile search is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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

  const executeSearch = (term) => {
    onSearch(term);
    setSearch("");
    setSuggestions([]);
    setIsMobileSearchOpen(false);
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSuggestionClick = (suggestion) => {
    executeSearch(suggestion);
  };

  const handleLocalSearch = () => {
    if (search.trim()) {
      executeSearch(search);
    }
  };

  // Extract the search UI logic to a function to prevent focus loss during rendering updates
  const renderSearchContent = (isMobile) => (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Search Input Container */}
      <div className="relative w-full mb-8 z-20">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        <input
          ref={isMobile ? searchInputRef : null}
          className="w-full h-14 sm:h-16 bg-surface/80 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-12 pr-24 sm:pl-16 sm:pr-40 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md transition-all duration-300 shadow-lg shadow-black/20"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        />

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-10 sm:h-12 px-4 sm:px-8 rounded-full text-sm sm:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-md focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden"
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  whileHover={{ backgroundColor: "rgba(3, 218, 198, 0.1)" }}
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-3 text-text-primary hover:text-primary cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0 flex items-center gap-3"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                  {suggestion}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Categories Horizontal Scroll - Only show if not in mobile overlay, or show different layout */}
      {!isMobile && (
        <div className="relative w-full max-w-7xl mt-8">
          <div className="absolute top-0 left-0 h-full w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      )}
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center">

      {/* Desktop/Tablet Header (Hidden in mobile overlay) */}
      <div className="hidden md:block">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Right Now
          </span>
        </h2>
        {renderSearchContent(false)}
      </div>

      {/* Mobile Inline Categories (Visible when overlay is closed) */}
      <div className="md:hidden w-full relative">
        <h2 className="text-3xl font-extrabold mb-8 tracking-tighter text-text-primary">
          Explore <span className="text-primary">Categories</span>
        </h2>
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-safe-top px-4 pb-safe"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center py-4 mb-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Using the render function prevents losing focus on keystrokes */}
            {renderSearchContent(true)}

            {/* Optional: Popular Searches / Recent could go here */}
            <div className="mt-8 text-left px-2">
              <h4 className="text-sm text-text-secondary font-semibold mb-4 uppercase tracking-wider">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {["cardio", "chest", "back", "legs", "shoulders"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setBodyPart(cat);
                      executeSearch(cat);
                    }}
                    className="bg-surface border border-gray-700 px-4 py-2 rounded-full text-sm capitalize hover:border-primary transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default SearchExercises;