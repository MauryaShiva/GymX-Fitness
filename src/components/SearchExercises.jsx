import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X, ArrowLeft } from "lucide-react";

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
      // Auto focus after a short delay to allow animation
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
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
        .slice(0, 8); // Increased for mobile view
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    setIsMobileSearchOpen(false); // Close overlay on search
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
      setIsMobileSearchOpen(false); // Close overlay on search
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
    setSuggestions([]);
  };

  // Render function to prevent input focus loss
  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? 'max-w-none px-4' : 'max-w-3xl mb-16'}`}>
      <div className={`absolute ${isMobile ? 'left-8' : 'left-5'} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10`}>
        <Search className="h-6 w-6" />
      </div>

      <input
        ref={isMobile ? searchInputRef : null}
        className={`w-full bg-surface/80 text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 ${
          isMobile ? 'h-14 text-base' : 'h-16 text-lg shadow-lg'
        }`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
      />

      {search && (
         <button
            onClick={() => { setSearch(''); setSuggestions([]); }}
            className={`absolute ${isMobile ? 'right-28' : 'right-36'} top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors`}
          >
            <X size={20} />
          </button>
      )}

      <button
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold rounded-full transition-all duration-300 focus:outline-none ${
          isMobile ? 'h-10 px-6 text-sm' : 'h-12 px-8 text-lg hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
        }`}
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className={`absolute mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden ${
          isMobile ? 'top-full left-0 max-h-[60vh] overflow-y-auto' : 'top-full'
        }`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-text-primary border-b border-gray-800 last:border-0 hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
            >
              <Search size={16} className="text-gray-500" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop & Default Search Section */}
      <section className="flex flex-col items-center mt-12 p-5 text-center bg-transparent text-text-primary py-10 md:py-20">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
          Find Your Perfect Workout, <br className="hidden md:block" />
          <span className="text-primary">
            Right Now
          </span>
        </h2>

        {/* Desktop Search Input (Hidden on Mobile) */}
        <div className="hidden md:block w-full max-w-3xl">
          {renderSearchContent(false)}
        </div>

        {/* Mobile Search Trigger Button */}
        <button
          className="md:hidden w-full max-w-sm h-14 bg-surface/50 border border-gray-800 rounded-full flex items-center px-6 text-gray-400 mb-8 shadow-sm backdrop-blur-sm"
          onClick={() => window.dispatchEvent(new Event('open-search'))}
        >
          <Search size={20} className="mr-3" />
          <span className="text-base">Search exercises...</span>
        </button>

        <div className="relative w-full max-w-7xl mt-4 md:mt-0">
          <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Full-Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-safe-top"
          >
            <div className="flex items-center px-4 h-16 border-b border-gray-800 bg-surface/50">
              <button
                onClick={closeMobileSearch}
                className="p-2 -ml-2 text-text-primary mr-2 focus:outline-none"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold flex-1 text-center pr-8">Search</h2>
            </div>

            <div className="p-4 flex-1 overflow-y-auto pb-safe">
              {renderSearchContent(true)}

              {!search && (
                <div className="mt-8 px-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Suggested Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {bodyParts.slice(1, 6).map((part, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setBodyPart(part); closeMobileSearch(); }}
                        className="px-4 py-2 bg-surface border border-gray-800 rounded-full text-sm capitalize text-text-secondary hover:text-primary hover:border-primary transition-colors"
                      >
                        {part}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
