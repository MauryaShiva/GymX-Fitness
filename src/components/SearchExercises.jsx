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

    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
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

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    setIsMobileSearchOpen(false);
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
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = () => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16 mt-4 md:mt-0">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={inputRef}
          className="w-full h-14 md:h-16 bg-surface text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 pr-32 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-11 md:h-12 px-6 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
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
                className="px-5 py-3 text-text-primary hover:bg-primary hover:text-background cursor-pointer transition-colors duration-200 capitalize font-medium border-b border-gray-800 last:border-0"
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
    </>
  );

  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-transparent py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-primary drop-shadow-md">Right Now</span>
        </h2>
        {renderSearchContent()}
      </section>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col pt-safe-top"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-surface">
              <h2 className="text-xl font-bold text-text-primary">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary focus:outline-none rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Inline Trigger (fallback if not opened via nav) */}
      <section className="md:hidden flex flex-col items-center p-4 text-center">
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight text-text-primary">
          Explore <span className="text-primary">Workouts</span>
        </h2>
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="w-full max-w-sm flex items-center bg-surface border border-gray-700 rounded-full py-3 px-6 text-text-secondary shadow-md"
        >
          <Search className="h-5 w-5 mr-3 text-text-secondary" />
          <span className="text-base">Search exercises...</span>
        </button>

        {/* We still want to show the categories on mobile home without searching */}
        <div className="w-full mt-8 relative">
           <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
           <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
