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
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
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

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    closeMobileSearch();
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
      closeMobileSearch();
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const SearchContent = ({ isMobile }) => (
    <div className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-3xl mb-16'}`}>
      {isMobile && (
        <button
          onClick={closeMobileSearch}
          className="absolute right-0 top-[-40px] text-gray-400 p-2 z-10"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? searchInputRef : null}
        className="w-full h-16 bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-24 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center bg-background text-white py-20 rounded-3xl mx-4 md:mx-0 shadow-sm border border-gray-800/50">
      <h2 className="text-3xl lg:text-6xl font-extrabold mb-10 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-red-500">
          Right Now
        </span>
      </h2>

      {/* Desktop Search */}
      <div className="hidden md:block w-full flex justify-center">
        <SearchContent isMobile={false} />
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background pt-safe-top px-4 flex flex-col md:hidden"
          >
            <div className="mt-16 w-full relative">
              <SearchContent isMobile={true} />
            </div>
            {/* Quick Suggestions for Mobile */}
            <div className="mt-8 text-left w-full max-w-md mx-auto">
              <p className="text-gray-400 mb-4 text-sm font-medium px-2">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['chest', 'back', 'cardio', 'dumbbell'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleSuggestionClick(term)}
                    className="bg-surface border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300 capitalize active:bg-red-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl mt-8 md:mt-0">
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default SearchExercises;
