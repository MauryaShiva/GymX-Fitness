import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
    const handleOpenSearch = () => {
      // Check if on mobile breakpoint (approximate, adjust as needed or use media queries strictly)
      if (window.innerWidth < 768) {
        setIsMobileSearchOpen(true);
        // Prevent body scrolling when search is open
        document.body.style.overflow = "hidden";
      } else {
        // On desktop, maybe focus the input instead
        const inputElement = document.getElementById("desktop-search-input");
        if (inputElement) inputElement.focus();
      }
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeSearch = () => {
    setIsMobileSearchOpen(false);
    document.body.style.overflow = "auto";
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
    closeSearch();
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100); // small delay to allow overlay to close
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      closeSearch();
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (search) {
      // If it's not in suggestions but user typed something, attempt search anyway via Fuse (already in Home.jsx)
       onSearch(search);
       setSuggestions([]);
       closeSearch();
       setTimeout(() => {
         document
           .getElementById("exercises")
           ?.scrollIntoView({ behavior: "smooth" });
       }, 100);
    }
  };

  // Render the core search input and suggestions so it can be used in both layouts
  // Note: Rendered as a function to avoid losing focus due to re-mounting if it were a component
  const renderSearchContent = (isMobile) => (
    <div className={`relative w-full ${isMobile ? 'max-w-none' : 'max-w-3xl'} mb-8 md:mb-16`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>

      <input
        id={isMobile ? "mobile-search-input" : "desktop-search-input"}
        className={`w-full h-16 bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-16 pr-${isMobile ? '4' : '32 md:pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-sm`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
        autoFocus={isMobile}
      />

      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white font-bold h-12 px-8 rounded-full text-base transition-colors duration-300 shadow-md"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-500 hover:text-red-600 dark:hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-100 dark:border-gray-700 last:border-none"
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
      {/* Desktop/Inline View */}
      <section className="flex flex-col items-center mt-12 p-5 text-center w-full">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
          Find Your Perfect Workout
        </h2>

        {renderSearchContent(false)}

        {/* Horizontal Scrollbar for Body Parts */}
        <div className="relative w-full max-w-7xl px-4 md:px-0">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* Mobile Full-Screen Overlay View */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-background pt-safe-top px-4 flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between py-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search</h2>
              <button
                onClick={closeSearch}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input Area */}
            {renderSearchContent(true)}

            {/* Recent Searches / Default Content area (if no search text) */}
            {!search && (
               <div className="flex-1 overflow-y-auto">
                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">Popular Body Parts</p>
                 <div className="flex flex-wrap gap-2">
                   {bodyParts.slice(1, 6).map((part) => (
                     <button
                       key={part}
                       onClick={() => {
                         setBodyPart(part);
                         closeSearch();
                         setTimeout(() => {
                            document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                         }, 100);
                       }}
                       className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm capitalize text-gray-700 dark:text-gray-300"
                     >
                       {part}
                     </button>
                   ))}
                 </div>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
