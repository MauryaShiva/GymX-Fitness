import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOpenMobile(true);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 300);
    };

    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  const closeMobileSearch = () => {
    setIsOpenMobile(false);
    setSearch("");
    setSuggestions([]);
  };

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

  const renderSearchContent = (isMobile = false) => (
    <>
      {!isMobile && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className={`relative w-full max-w-3xl ${isMobile ? 'mb-4 mt-safe-top pt-4' : 'mb-16'}`}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none mt-[isMobile?8px:0]">
          <Search className={`h-6 w-6 ${isMobile ? 'mt-2' : ''}`} />
        </div>
        <input
          ref={isMobile ? inputRef : null}
          className={`w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 ${isMobile ? 'pr-12' : 'pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLocalSearch();
              if (isMobile) closeMobileSearch();
            }
          }}
          onClick={(e) => e.target.select()}
        />

        {!isMobile ? (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            onClick={handleLocalSearch}
          >
            Search
          </button>
        ) : (
          <button
            onClick={closeMobileSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {suggestions.length > 0 && (
          <ul className={`absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-y-auto ${isMobile ? 'max-h-[60vh]' : 'overflow-hidden'}`}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  if (isMobile) closeMobileSearch();
                }}
                className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobile && (
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

  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        {renderSearchContent()}
      </section>

      {/* Mobile Categories (Shown when overlay is closed) */}
      <section className="md:hidden flex flex-col items-center mt-4 p-4 text-center bg-gradient-to-b from-black to-gray-900 text-white rounded-xl mx-4 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Categories</h3>
        <div className="relative w-full">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-black text-white p-4 flex flex-col"
          >
            {renderSearchContent(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
