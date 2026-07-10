import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile search overlay state
  const [isSearchActive, setIsSearchActive] = useState(false);
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
    if (isSearchActive && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchActive]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    onSearch(term);
    setIsSearchActive(false);
    setSearch("");
    setSuggestions([]);
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSuggestionClick = (suggestion) => {
    executeSearch(suggestion);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      executeSearch(search);
    } else if (search) {
      // Just search with fuse if not exact
      executeSearch(search);
    }
  };

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center w-full">
      <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 tracking-tighter text-text-primary">
        Find Your Perfect Workout, <br />
        <span className="text-primary">Right Now</span>
      </h2>

      {/* Desktop Search Bar / Mobile Trigger */}
      <div className="relative w-full max-w-3xl mb-12" onClick={() => {
        if (window.innerWidth < 768) {
          setIsSearchActive(true);
        }
      }}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          id="mobile-search-trigger"
          className="w-full h-14 bg-surface text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 md:cursor-text cursor-pointer"
          value={search}
          onChange={(e) => {
             if (window.innerWidth >= 768) handleInputChange(e);
          }}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          readOnly={window.innerWidth < 768}
        />
        <button
          className="hidden md:block absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-11 px-8 rounded-full text-base hover:scale-105 active:scale-95 transform transition-all duration-300 focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* Desktop Suggestions */}
        {suggestions.length > 0 && !isSearchActive && (
          <ul className="hidden md:block absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-gray-800 hover:text-primary cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col md:hidden pt-safe-top"
          >
            <div className="flex items-center p-4 border-b border-gray-800 gap-3">
              <button
                onClick={() => {
                  setIsSearchActive(false);
                  setSearch("");
                  setSuggestions([]);
                }}
                className="p-2 -ml-2 text-text-primary focus:outline-none"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  className="w-full h-10 bg-surface text-text-primary placeholder-gray-500 rounded-full py-2 pl-4 pr-10 text-base focus:outline-none"
                  value={search}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  type="search"
                  onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {suggestions.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 text-text-primary border-b border-gray-800/50 hover:bg-surface active:bg-surface rounded-lg cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
                    >
                      <Search size={16} className="text-gray-500" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : search.length > 1 ? (
                <div className="text-center text-text-secondary mt-10">
                  No results found for "{search}"
                </div>
              ) : (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider px-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['chest', 'back', 'cardio', 'dumbbell'].map(term => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="bg-surface px-4 py-2 rounded-full text-sm font-medium capitalize border border-gray-800"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl relative">
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </div>
    </section>
  );
};

export default SearchExercises;
