import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile Search Overlay State
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
  }, []);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      // Focus input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  // Lock body scroll when overlay is open
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
    setIsMobileSearchOpen(false); // Close mobile search overlay
    onSearch(suggestion);
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      setIsMobileSearchOpen(false); // Close mobile search overlay
      onSearch(search);
      setSuggestions([]);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchInput = (isMobile) => (
    <div className={`relative w-full ${!isMobile ? "max-w-3xl mb-16 hidden md:block" : ""}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? searchInputRef : null}
        className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className={`absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-[60] text-left overflow-hidden ${isMobile ? "top-full" : "top-full"}`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 md:py-3 text-gray-300 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-700/50 last:border-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>

        {/* Desktop Search Input */}
        {renderSearchInput(false)}

        {/* Mobile Search Button (visible only when modal is closed) */}
        <div className="md:hidden w-full max-w-sm mb-12">
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="w-full flex items-center justify-between h-14 bg-gray-800/50 border border-gray-700 rounded-full px-6 text-gray-400 hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Search className="w-5 h-5" />
              <span>Search exercises...</span>
            </span>
          </button>
        </div>

        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-[5] pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-[5] pointer-events-none" />
        </div>
      </section>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col"
          >
            <div className="p-4 pt-safe-top flex items-center gap-3 border-b border-gray-800 bg-surface">
              <div className="flex-1">
                {renderSearchInput(true)}
              </div>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 active:scale-95 transition-all"
                aria-label="Close Search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Suggestions when input is empty */}
            {search.length <= 1 && (
              <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">Popular Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {["back", "chest", "cardio", "dumbbell", "biceps"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestionClick(term)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-200 capitalize active:scale-95 transition-transform"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
