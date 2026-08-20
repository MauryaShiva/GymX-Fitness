import React, { useEffect, useState, useRef } from "react";
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
      setTimeout(() => searchInputRef.current?.focus(), 100);
    };

    const handleExecuteSearch = (e) => {
      if (e.detail?.query) {
        setSearch(e.detail.query);
        handleLocalSearch(e.detail.query);
      }
    };

    window.addEventListener("open-search", handleOpenSearch);
    window.addEventListener("execute-search", handleExecuteSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("execute-search", handleExecuteSearch);
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

  const closeSearchOverlay = () => {
    setIsMobileSearchOpen(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    closeSearchOverlay();
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = (forceQuery = null) => {
    const queryToUse = typeof forceQuery === 'string' ? forceQuery : search;
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(queryToUse.toLowerCase());

    if (queryToUse && isValidSearch) {
      onSearch(queryToUse);
      setSuggestions([]);
      closeSearchOverlay();
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = (isMobileOverlay = false) => (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {isMobileOverlay && (
        <div className="w-full flex justify-end mb-4 pt-safe-top">
          <button onClick={closeSearchOverlay} className="p-2 text-text-secondary hover:text-white">
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      {!isMobileOverlay && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter hidden md:block">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className="relative w-full mb-8">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={isMobileOverlay ? searchInputRef : null}
          className="w-full h-16 bg-surface/50 text-white placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-16 pr-[120px] text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 rounded-full text-md hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 text-text-primary hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800/50 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-6 md:mt-12 p-5 text-center bg-transparent">

      {/* Desktop Search */}
      <div className="hidden md:flex w-full justify-center">
        {renderSearchContent()}
      </div>

      {/* Mobile Search Input Trigger */}
      <div className="md:hidden w-full relative mb-8" onClick={() => setIsMobileSearchOpen(true)}>
         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <div className="w-full h-14 bg-surface/50 text-text-secondary border border-gray-700 rounded-full flex items-center pl-16 text-lg cursor-text backdrop-blur-sm">
          Search exercises...
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col p-4 md:hidden"
          >
             {renderSearchContent(true)}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl mt-4 md:mt-8">
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
