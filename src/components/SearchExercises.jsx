import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isOpen, onClose }) => {
  // --- All State and Logic is UNCHANGED ---
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

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

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
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  const handleBodyPartClick = (part) => {
    setBodyPart(part);
    if (onClose) onClose();
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  // Render logic structured as a function so it can be called safely to avoid input focus loss
  const renderSearchContent = (isMobileOverlay = false) => (
    <div className={`flex flex-col items-center w-full ${isMobileOverlay ? "mt-4" : "mt-12 p-5 text-center bg-surface text-text-primary py-20 rounded-2xl"}`}>
      {!isMobileOverlay && (
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 tracking-tight text-white">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>
      )}

      <div className="relative w-full max-w-3xl mb-10 md:mb-16 px-4 md:px-0">
        <div className="absolute left-8 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={isMobileOverlay ? inputRef : null}
          className="w-full h-14 md:h-16 bg-background text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-10 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:bg-red-600 active:scale-95 transition-all duration-300 shadow-lg focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 left-4 right-4 md:left-0 md:right-0 bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-8 md:w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartClick}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-8 md:w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop View (Standard inline render) */}
      <div className="hidden md:block">
        {renderSearchContent(false)}
      </div>

      {/* Mobile Full-Screen Overlay View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[100] bg-surface pt-safe-top flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Search</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-safe">
              {renderSearchContent(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
