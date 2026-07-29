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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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

    // Listen for custom event to open search overlay
    const handleOpenSearch = () => {
      setIsOverlayOpen(true);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
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
    setIsOverlayOpen(false); // Close overlay on select
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
    } else if (search) {
      // Allow general text search if it's not in the exact list, Fuse.js will handle it
      onSearch(search);
      setSuggestions([]);
      setIsOverlayOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // The actual search UI rendered as a function to avoid focus loss
  const renderSearchContent = () => (
    <div className="flex flex-col items-center w-full max-w-3xl">
      <h2 className="text-3xl lg:text-5xl font-extrabold mb-8 tracking-tighter text-white">
        Find Your Perfect Workout
      </h2>

      <div className="relative w-full mb-12">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={searchInputRef}
          className="w-full h-14 bg-surface text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-12 px-6 rounded-full text-md hover:scale-105 active:scale-95 transform transition-all duration-300 focus:outline-none"
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
                className="px-5 py-3 text-text-primary hover:bg-gray-700 cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
              >
                <Search size={16} className="text-text-secondary" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full max-w-7xl pb-8">
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Inline Search Section */}
      <section className="hidden md:flex flex-col items-center mt-8 p-5 text-center bg-background">
        {renderSearchContent()}
      </section>

      {/* Mobile Inline trigger (if they don't use navbar/bottomnav) */}
      <section className="md:hidden flex flex-col items-center mt-4 px-4 text-center">
        <button
          onClick={() => setIsOverlayOpen(true)}
          className="w-full h-14 bg-surface text-text-secondary border border-gray-700 rounded-xl flex items-center px-4 gap-3 text-lg"
        >
          <Search size={24} />
          <span>Search exercises, muscles...</span>
        </button>

        <div className="w-full mt-8">
           <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* Full-screen Mobile Search Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl p-6 pt-safe-top flex flex-col overflow-y-auto"
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 bg-surface rounded-full text-text-primary"
              >
                <X size={24} />
              </button>
            </div>
            {renderSearchContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
