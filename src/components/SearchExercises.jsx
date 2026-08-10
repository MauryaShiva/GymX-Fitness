import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

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
    onSearch(suggestion);
    onClose?.(); // Close mobile overlay if open
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      onClose?.(); // Close mobile overlay if open
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  // Define inner content as a function to prevent focus loss in React due to re-mounting
  // (per project memory guidelines)
  const renderSearchContent = () => (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto px-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter text-center">
        Find Your Perfect Workout, <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
          Right Now
        </span>
      </h2>

      {/* Search Input Area */}
      <div className="relative w-full max-w-3xl mb-12 md:mb-16">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <input
          className="w-full h-14 md:h-16 bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-12 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-11 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-lg z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Horizontal Scrollbar */}
      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
            setBodyPart(part);
            onClose?.(); // Close mobile search overlay if a category is picked
          }}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop View (Inline) */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-background text-white py-20 w-full relative z-10">
        {renderSearchContent()}
      </section>

      {/* Mobile View (Full Screen Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col pt-safe-top pb-safe overflow-y-auto"
          >
            {/* Header for mobile overlay */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-800">
              <span className="text-xl font-bold">Search</span>
              <button
                onClick={onClose}
                className="p-2 bg-surface rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 py-8 overflow-y-auto">
               {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
