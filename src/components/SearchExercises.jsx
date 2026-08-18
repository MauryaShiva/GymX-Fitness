import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener("open-search", handleOpenSearch);

    // Check URL for search parameter
    const params = new URLSearchParams(location.search);
    if (params.get("search") === "true") {
      setIsOpen(true);
      // Clean up URL without triggering reload
      navigate(location.pathname, { replace: true });
    }

    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, [location, navigate]);

  const handleCloseSearch = () => {
    setIsOpen(false);
    setSearch("");
    setSuggestions([]);
  };

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
    handleCloseSearch();
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      handleCloseSearch();
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    } else if (search) {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  // Using a function call for inner render to prevent input focus loss issue
  const renderSearchOverlay = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[var(--color-background)] flex flex-col pt-safe-top pb-safe"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Search</h2>
            <button
              onClick={handleCloseSearch}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input Container */}
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                autoFocus
                className="w-full bg-[var(--color-surface)] text-white placeholder-gray-400 rounded-xl py-4 pl-12 pr-24 text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border border-gray-700"
                value={search}
                onChange={handleInputChange}
                placeholder="Exercises, muscles, equipment..."
                type="text"
                onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
              />
              <button
                className="absolute right-2 top-2 bottom-2 bg-[var(--color-primary)] text-white font-semibold px-4 rounded-lg text-sm hover:bg-red-600 active:scale-95 transition-all"
                onClick={handleLocalSearch}
              >
                Search
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="mt-4 bg-[var(--color-surface)] border border-gray-700 rounded-xl overflow-hidden shadow-2xl divide-y divide-gray-800">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-4 text-gray-200 hover:bg-gray-700 cursor-pointer transition-colors capitalize flex items-center gap-3"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Categories / Body Parts - Only show if not typing to save space */}
          {!search && (
            <div className="flex-1 overflow-y-auto px-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
              <div className="pb-8">
                 {/* Re-using existing HorizontalScrollbar logic but adapted for this overlay */}
                 <HorizontalScrollbar
                  data={bodyParts}
                  bodyPart={bodyPart}
                  setBodyPart={(part) => {
                     setBodyPart(part);
                     handleCloseSearch();
                     document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  isBodyParts
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/*
        The desktop/inline version is simplified and acts as a trigger for the full overlay
        on mobile, or a standard hero section on desktop.
      */}
      <section className="flex flex-col items-center mt-8 px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-10 tracking-tight text-white">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Right Now
          </span>
        </h2>

        {/* Trigger Button pretending to be an input for desktop/mobile consistency */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full max-w-2xl mb-12 cursor-pointer group"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-hover:text-red-500 transition-colors">
            <Search className="h-6 w-6" />
          </div>
          <div className="w-full h-16 bg-[var(--color-surface)] text-left text-gray-400 border border-gray-700 rounded-full py-4 pl-14 pr-4 text-lg hover:border-gray-500 transition-all flex items-center shadow-lg">
            Search exercises, muscles, equipment...
          </div>
          <div className="absolute right-2 top-2 bottom-2 bg-[var(--color-primary)] text-white font-bold px-8 rounded-full flex items-center group-hover:bg-red-600 transition-colors">
            Search
          </div>
        </div>
      </section>

      {/* Render the full screen overlay */}
      {renderSearchOverlay()}
    </>
  );
};

export default SearchExercises;
