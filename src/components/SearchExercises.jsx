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
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
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
    setIsOverlayOpen(false); // Close overlay on mobile
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
      setIsOverlayOpen(false); // Close overlay on mobile
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = (isMobile = false) => {
    return (
      <div className={`w-full max-w-3xl ${isMobile ? "mt-4" : "mb-16 relative"}`}>
        <div className="relative w-full">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <Search className="h-6 w-6" />
          </div>
          <input
            ref={isMobile ? inputRef : null}
            className="w-full h-16 bg-surface/50 text-text-primary placeholder-text-muted border border-border rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
            value={search}
            onChange={handleInputChange}
            placeholder="Search exercises, muscles..."
            type="text"
            onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
            onClick={handleLocalSearch}
          >
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className={`absolute ${isMobile ? "top-20" : "top-full mt-2"} left-0 w-full bg-surface border border-border rounded-xl shadow-2xl z-50 text-left overflow-hidden`}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 text-text-secondary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-border last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background pt-safe-top px-4 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center py-4">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 rounded-full bg-surface text-text-secondary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {renderSearchContent(true)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Inline Search Section */}
      <section className="flex flex-col items-center mt-12 p-5 text-center text-text-primary py-10 md:py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>

        {/* Desktop Search Input (Hidden on mobile) */}
        <div className="hidden md:block w-full flex justify-center">
          {renderSearchContent(false)}
        </div>

        {/* Mobile trigger button (visible when inline input is hidden) */}
        <button
          onClick={() => setIsOverlayOpen(true)}
          className="md:hidden w-full max-w-sm mb-12 h-14 bg-surface/50 border border-border rounded-full flex items-center px-6 text-text-muted text-lg shadow-inner"
        >
          <Search className="w-5 h-5 mr-3" />
          Tap to search...
        </button>

        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
