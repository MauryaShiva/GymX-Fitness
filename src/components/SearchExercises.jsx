import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile overlay state
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOpenSearch = () => {
      // Only open overlay on mobile
      if (window.innerWidth < 768) {
        setIsOverlayOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);


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
    setIsOverlayOpen(false); // Close overlay on suggestion click
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
      onSearch(search);
      setSuggestions([]);
      setIsOverlayOpen(false); // Close overlay on search
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

  const renderSearchContent = (isOverlay = false) => (
    <div className={`relative w-full max-w-3xl ${isOverlay ? 'mt-4 px-4' : 'mb-16'}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>

      <input
        ref={isOverlay ? inputRef : null}
        className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-300 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize text-lg border-b border-gray-700 last:border-b-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 md:py-20">
      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col pt-safe-top"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold">Search</h3>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {renderSearchContent(true)}

            {/* Quick Categories in Overlay */}
            <div className="mt-8 px-4 flex-1 overflow-y-auto pb-safe">
               <h4 className="text-left text-text-secondary mb-4 text-sm font-semibold uppercase tracking-wider">Quick Categories</h4>
               <div className="flex flex-wrap gap-2">
                 {['cardio', 'chest', 'back', 'legs'].map(cat => (
                   <button
                     key={cat}
                     onClick={() => handleSuggestionClick(cat)}
                     className="px-4 py-2 bg-surface border border-gray-700 rounded-full text-sm capitalize"
                   >
                     {cat}
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
          Right Now
        </span>
      </h2>

      {/* Desktop Search Input (Hidden on mobile if overlay is preferred, but here we keep it visible for flexibility) */}
      <div className="hidden md:block w-full max-w-3xl">
        {renderSearchContent(false)}
      </div>

      <div className="relative w-full max-w-7xl mt-8 md:mt-0">
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
