import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isOverlay, onClose }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
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

    // Focus input automatically if opened as an overlay
    if (isOverlay && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOverlay]);

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
    if (isOverlay && onClose) onClose();
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      if (isOverlay && onClose) onClose();
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    } else if (search) {
      // If typing freely, perform partial search by sending the term
      onSearch(search);
      setSuggestions([]);
      if (isOverlay && onClose) onClose();
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    if (inputRef.current) inputRef.current.focus();
  };

  // Content rendering changes based on whether it is a mobile overlay or inline component
  const Content = (
    <>
      {!isOverlay && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
      )}

      {isOverlay && (
        <div className="flex justify-between items-center w-full mb-6 pt-safe">
          <h2 className="text-2xl font-bold text-white">Search</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full bg-gray-800/50">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className={`relative w-full ${isOverlay ? 'max-w-full' : 'max-w-3xl'} mb-16`}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>

        <input
          ref={inputRef}
          className={`w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 ${isOverlay ? 'pr-16' : 'pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        />

        {search && isOverlay && (
          <button
            onClick={clearSearch}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {!isOverlay && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            onClick={handleLocalSearch}
          >
            Search
          </button>
        )}

        {suggestions.length > 0 && (
          <ul className={`absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-hidden ${isOverlay ? 'max-h-60 overflow-y-auto' : ''}`}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-700 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isOverlay && (
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
      )}
    </>
  );

  if (isOverlay) {
    return (
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6 items-center"
      >
        {Content}
      </motion.div>
    );
  }

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
      {Content}
    </section>
  );
};

export default SearchExercises;
