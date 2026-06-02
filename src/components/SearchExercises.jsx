import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isSearchOpen, setIsSearchOpen }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

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
    if (setIsSearchOpen) setIsSearchOpen(false);
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
      if (setIsSearchOpen) setIsSearchOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };
  // --- End of Unchanged Logic ---

  const searchContent = (
    <div className="relative w-full max-w-3xl mx-auto mb-8 md:mb-16">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={inputRef}
        className="w-full h-14 md:h-16 bg-gray-800/80 text-white placeholder-gray-400 border border-gray-700 rounded-full py-2 pl-14 pr-32 md:pl-16 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-md transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-11 md:h-12 px-6 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-200 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize text-lg border-b border-gray-700 last:border-0"
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
      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] bg-gray-950/95 backdrop-blur-xl pt-safe flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Search Exercises</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {searchContent}

              <div className="mt-8">
                <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider px-2">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {bodyParts.slice(1, 7).map((part) => (
                    <button
                      key={part}
                      onClick={() => handleSuggestionClick(part)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm capitalize hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Inline Search (Hidden on Mobile) */}
      <section className="flex flex-col items-center mt-6 md:mt-12 p-4 md:p-5 text-center bg-gray-950 text-white md:py-20 w-full overflow-hidden">
        <h2 className="hidden md:block text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>

        <div className="hidden md:block w-full">
          {searchContent}
        </div>

        {/* Horizontal Scrollbar - visible on all screens */}
        <div className="relative w-full max-w-7xl mt-4 md:mt-0 px-2 md:px-0">
          <div className="absolute top-0 left-0 h-full w-8 md:w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-8 md:w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
