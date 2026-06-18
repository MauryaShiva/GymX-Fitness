import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  // Listen for global search event from navbar
  useEffect(() => {
    const handleGlobalSearch = () => {
      setIsMobileSearchOpen(true);
      // Focus after state update
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("global-search", handleGlobalSearch);
    return () => window.removeEventListener("global-search", handleGlobalSearch);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // slightly more suggestions for full screen
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
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false);
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (search) {
      // Just search what they typed even if not exact, Fuse.js handles it well
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false);
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };
  // --- End of Unchanged Logic ---

  return (
    <section className="flex flex-col items-center mt-4 md:mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 md:py-20 rounded-3xl mx-2 shadow-2xl">
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
          Right Now
        </span>
      </h2>

      {/* Desktop Inline Search / Mobile Trigger */}
      <div className="relative w-full max-w-3xl mb-12 md:mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>

        {/* Desktop Input - shown on md+, hidden on mobile */}
        <div className="hidden md:block">
          <input
            className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            value={search}
            onChange={handleInputChange}
            placeholder="Search exercises, muscles, equipment..."
            type="text"
            onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            onClick={handleLocalSearch}
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-10 text-left overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Trigger - visible on small screens */}
        <div
          className="md:hidden w-full h-14 bg-gray-800/50 border border-gray-700 rounded-full flex items-center pl-16 pr-4 backdrop-blur-sm cursor-text text-left text-gray-500"
          onClick={() => setIsMobileSearchOpen(true)}
        >
          {search || "Search exercises..."}
        </div>
      </div>

      {/* Full-Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-gray-900 pt-safe px-4 pb-0 flex flex-col md:hidden"
          >
            <div className="flex items-center gap-3 py-4 border-b border-gray-800 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full h-12 bg-gray-800 text-white rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Search..."
                  value={search}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
                />
              </div>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-gray-400 hover:text-white p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {suggestions.length > 0 ? (
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 bg-gray-800/50 rounded-xl text-gray-200 active:bg-red-600 transition-colors capitalize flex items-center gap-3"
                    >
                      <Search className="h-4 w-4 text-gray-500" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : search.length > 1 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Press enter to search for "{search}"</p>
                </div>
              ) : (
                <div className="text-gray-500 px-2 mt-4">
                  <p className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wider">Quick Filters</p>
                  <div className="flex flex-wrap gap-2">
                    {["chest", "back", "arms", "legs", "shoulders", "cardio"].map(term => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-4 py-2 bg-gray-800 rounded-full text-sm capitalize active:bg-red-500 active:text-white transition-colors"
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

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default SearchExercises;
