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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOverlayOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
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

  const executeSearch = (searchTerm) => {
      onSearch(searchTerm);
      setIsOverlayOpen(false);
      setSearch("");
      setSuggestions([]);
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
  }

  const handleSuggestionClick = (suggestion) => {
    executeSearch(suggestion);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      executeSearch(search);
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = () => (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
        {/* Header (visible mostly in overlay) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="text-xl font-bold text-white">Search</h3>
            <button onClick={() => setIsOverlayOpen(false)} className="text-text-secondary hover:text-white p-2">
                <X size={24} />
            </button>
        </div>

      <div className="relative w-full mb-8 flex-shrink-0">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={inputRef}
          className="w-full h-14 md:h-16 bg-surface text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 pr-32 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-lg"
          value={search}
          onChange={handleInputChange}
          placeholder="Exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-black font-bold h-10 md:h-12 px-6 rounded-full text-sm md:text-lg hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(3,218,198,0.4)] focus:outline-none"
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
                className="px-5 py-3 text-text-secondary hover:bg-gray-800 hover:text-primary cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

       {/* Categories scroll area */}
       <div className="relative w-full max-w-7xl flex-grow overflow-hidden flex flex-col justify-center">
         <h4 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider text-center md:text-left">Browse Categories</h4>
         <div className="relative w-full">
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <HorizontalScrollbar
              data={bodyParts}
              bodyPart={bodyPart}
              setBodyPart={(part) => {
                  setBodyPart(part);
                  setIsOverlayOpen(false); // Close overlay if open
              }}
              isBodyParts
            />
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
         </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Inline View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center text-white py-12">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-10 tracking-tight text-white">
          Find Your Perfect Workout
        </h2>
        {renderSearchContent()}
      </section>

      {/* Mobile Full-Screen Overlay View */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-background pt-safe-top pb-safe px-4 py-6 overflow-y-auto"
          >
             {renderSearchContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
