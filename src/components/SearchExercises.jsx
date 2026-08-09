import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOverlayOpen(true);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
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
      setIsOverlayOpen(false);
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
  // --- End of Unchanged Logic ---

  // Refactored to invoke render visually to prevent input focus loss
  const renderSearchContent = (isMobileOverlay = false) => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={isMobileOverlay ? searchInputRef : null}
          className="w-full h-14 md:h-16 bg-surface border border-border rounded-full py-2 pl-16 pr-24 md:pr-40 text-base md:text-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-8 rounded-full text-lg hover:bg-primary-dark active:scale-95 transition-all shadow-md focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-border rounded-xl shadow-2xl z-20 text-left overflow-hidden max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion)} // use onMouseDown to prevent input blur before click
                className="px-5 py-3 text-text-secondary hover:bg-primary hover:text-white cursor-pointer transition-colors capitalize border-b border-border last:border-none"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Horizontal Scrollbar - Hide on full-screen overlay for cleaner look if desired, or keep it. Kept here. */}
      <div className={`relative w-full max-w-7xl ${isMobileOverlay ? 'mb-4' : ''}`}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
            setBodyPart(part);
            if (isMobileOverlay) setIsOverlayOpen(false);
          }}
          isBodyParts
        />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>
        {renderSearchContent(false)}
      </section>

      {/* Mobile Trigger (Hidden on Desktop) */}
      <section className="md:hidden flex flex-col items-center mt-6 px-4 py-8">
         <h2 className="text-3xl font-extrabold mb-6 tracking-tight text-text-primary text-center">
          Find Your <br /> Perfect Workout
        </h2>
        <div
          onClick={() => setIsOverlayOpen(true)}
          className="w-full h-14 bg-surface border border-border rounded-full flex items-center px-5 text-text-muted cursor-pointer shadow-sm"
        >
          <Search className="h-5 w-5 mr-3" />
          <span className="text-base">Search exercises...</span>
        </div>
        <div className="mt-8 w-full">
           <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* Full-Screen Mobile Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[100] bg-background pt-safe-top flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary rounded-full bg-surface"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col items-center pt-8">
               {renderSearchContent(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
