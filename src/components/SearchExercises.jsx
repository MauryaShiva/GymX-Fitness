import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X, ArrowLeft } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

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
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);

    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("search") === "true") {
      handleOpenSearch();
    }

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [location.search]);


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
    if (isMobileSearchOpen) {
      setIsMobileSearchOpen(false);
    } else {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      if (isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
      } else {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
    setSuggestions([]);
  };

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? 'max-w-none' : 'max-w-3xl mb-16'}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>

      <input
        ref={isMobile ? inputRef : null}
        className="w-full h-16 bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
      />

      {search && (
        <button
          onClick={clearSearch}
          className="absolute right-24 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 rounded-full text-sm sm:text-base hover:bg-red-600 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20"
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
              className="px-5 py-4 text-gray-300 hover:bg-gray-700 cursor-pointer transition-colors duration-200 capitalize border-b border-gray-700/50 last:border-0 flex items-center gap-3"
            >
              <Search className="h-4 w-4 text-gray-500" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Inline Search */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-transparent text-text-primary py-20">
        <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>

        {renderSearchContent(false)}

        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Inline Category Scroll (Hidden Search Input on Mobile) */}
      <section className="md:hidden mt-8 p-4">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background pt-safe-top flex flex-col md:hidden"
          >
            <div className="flex items-center p-4 border-b border-gray-800 gap-3">
              <button
                onClick={closeMobileSearch}
                className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-bold">Search</h2>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              {renderSearchContent(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
