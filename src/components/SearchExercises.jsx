import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

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
      setIsMobileSearchOpen(true);
      // Optional: focus input when modal opens
      setTimeout(() => {
        document.getElementById("mobile-search-input")?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    window.addEventListener("execute-search", handleOpenSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("execute-search", handleOpenSearch);
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
    setIsMobileSearchOpen(false);
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
      setIsMobileSearchOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = () => (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tighter text-center">
        Find Your Perfect Workout, <br />
        <span className="text-primary">Right Now</span>
      </h2>

      <div className="relative w-full max-w-3xl mb-12 md:mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          id="mobile-search-input"
          className="w-full h-14 md:h-16 bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-black font-bold h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
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
                className="px-5 py-3 text-text-secondary hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
             setBodyPart(part);
             setIsMobileSearchOpen(false);
          }}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Inline Search */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center text-white py-20 bg-background">
        {renderSearchContent()}
      </section>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-background text-white p-5 pt-safe-top overflow-y-auto"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-white"
              >
                <X className="w-6 h-6" />
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
