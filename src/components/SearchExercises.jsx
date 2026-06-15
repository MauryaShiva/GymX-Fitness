import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({
  onSearch,
  bodyPart,
  setBodyPart,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
}) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

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
      if (setIsMobileSearchOpen) setIsMobileSearchOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const mobileInputRef = useRef(null);

  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      setTimeout(() => {
        mobileInputRef.current.focus();
      }, 100);
    }
  }, [isMobileSearchOpen]);

  const searchInputContent = (
    <div className="relative w-full max-w-3xl">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={mobileInputRef}
        className="w-full h-16 bg-gray-800/80 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-md transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleSuggestionClick(suggestion);
                if (setIsMobileSearchOpen) setIsMobileSearchOpen(false);
              }}
              className="px-5 py-4 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-700/50 last:border-0"
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
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-gray-900 pt-safe px-4 pb-0 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center py-4">
              <h2 className="text-2xl font-bold text-white">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex-grow flex flex-col">
              {searchInputContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>

        {/* Desktop Search Input (Hidden on Mobile) */}
        <div className="hidden md:block w-full max-w-3xl mb-16">
          {searchInputContent}
        </div>

        {/* Mobile Search Trigger Button (Visible only on Mobile) */}
        <div className="md:hidden w-full mb-16">
           <button
             onClick={() => setIsMobileSearchOpen(true)}
             className="w-full h-16 bg-gray-800/50 text-gray-400 border border-gray-700 rounded-full py-2 px-6 text-lg flex items-center justify-start backdrop-blur-sm shadow-lg"
           >
             <Search className="w-6 h-6 mr-3" />
             <span>Search exercises, muscles...</span>
           </button>
        </div>

        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-0 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-0 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
