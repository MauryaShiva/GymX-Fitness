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
  const inputRef = useRef(null);

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
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

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

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full max-w-3xl mb-16 ${isMobile ? 'px-4' : ''}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? inputRef : null}
        className={`w-full h-16 bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 ${isMobile ? 'pr-4' : 'pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-lg z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleSuggestionClick(suggestion);
                setIsMobileSearchOpen(false);
              }}
              className="px-5 py-4 text-gray-300 hover:bg-primary hover:text-background cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center text-white py-20 relative">
      <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-primary">Right Now</span>
      </h2>

      {/* Desktop Search */}
      <div className="hidden md:block w-full flex justify-center">
        {renderSearchContent()}
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col pt-safe-top"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 rounded-full bg-surface text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {renderSearchContent(true)}
              {suggestions.length === 0 && search.length < 2 && (
                <div className="mt-8">
                  <h4 className="text-gray-400 mb-4 text-left font-semibold">Popular Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {bodyParts.slice(1, 6).map(part => (
                      <button
                        key={part}
                        onClick={() => {
                          setSearch(part);
                          handleLocalSearch();
                        }}
                        className="px-4 py-2 bg-surface rounded-full text-sm font-medium capitalize border border-gray-700"
                      >
                        {part}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
      </div>
    </section>
  );
};

export default SearchExercises;
