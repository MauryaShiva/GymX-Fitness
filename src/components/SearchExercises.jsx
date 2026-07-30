import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const inputRef = useRef(null);

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
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

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
    if (onClose) onClose();
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      if (onClose) onClose();
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Could be better as a toast
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = () => (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto h-full justify-center lg:justify-start pt-10 lg:pt-0">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter text-center">
        Find Your Perfect Workout, <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
          Right Now
        </span>
      </h2>

      <div className="relative w-full max-w-3xl mb-12 md:mb-16 px-4 md:px-0">
        <div className="absolute left-8 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={inputRef}
          className="w-full h-14 md:h-16 bg-surface text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-inner shadow-black/50"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-10 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:bg-red-600 active:scale-95 transition-all duration-300"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-[calc(100%-2rem)] md:w-full mx-4 md:mx-0 bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 border-b border-gray-800 last:border-b-0 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer transition-colors duration-200 capitalize flex items-center"
              >
                <Search className="h-4 w-4 mr-3 text-gray-500" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full hidden md:block">
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
            setBodyPart(part);
            if (onClose) onClose();
          }}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
      </div>

      {/* Mobile Categories (Simplified list instead of horizontal scroll for better mobile UX inside overlay) */}
      <div className="md:hidden w-full px-4 mb-safe overflow-y-auto max-h-[40vh]">
         <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider pl-2">Categories</h3>
         <div className="flex flex-wrap gap-2">
            {bodyParts.slice(0, 10).map((part) => (
              <button
                key={part}
                onClick={() => {
                  setBodyPart(part);
                  if (onClose) onClose();
                }}
                className={`px-4 py-2 rounded-full text-sm capitalize ${
                  bodyPart === part
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-gray-800 text-gray-300'
                }`}
              >
                {part}
              </button>
            ))}
         </div>
      </div>
    </div>
  );

  // Desktop inline rendering
  if (isOpen === undefined) {
    return (
      <section className="flex flex-col items-center mt-12 p-5 text-center">
        {renderSearchContent()}
      </section>
    );
  }

  // Mobile full-screen overlay rendering
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col pt-safe-top"
        >
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 bg-surface rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {renderSearchContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchExercises;