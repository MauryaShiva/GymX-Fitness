import React, { useEffect, useState, useRef } from "react";
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
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300); // Wait for animation
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
    setIsMobileSearchOpen(false); // Close mobile overlay on select
    setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false); // Close mobile overlay on search
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? "max-w-full" : "max-w-3xl mb-16"} mx-auto`}>
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isMobile ? 'left-12' : ''}`}>
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? searchInputRef : null}
        className={`w-full h-14 sm:h-16 bg-surface text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 ${isMobile ? 'pl-20 pr-12' : 'pl-16 pr-32 sm:pr-40'} text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-inner`}
        value={search}
        onChange={handleInputChange}
        placeholder={isMobile ? "Search..." : "Search exercises, muscles, equipment..."}
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-10 sm:h-12 px-4 sm:px-8 rounded-full text-sm sm:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}
      {isMobile && search && (
        <button
          onClick={() => { setSearch(''); setSuggestions([]); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary p-1"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className={`absolute ${isMobile ? 'top-16 left-0 right-0 max-h-[60vh] overflow-y-auto' : 'top-full mt-2 w-full'} bg-surface border border-gray-700 rounded-xl shadow-2xl z-[70] text-left overflow-hidden`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 sm:py-3 text-text-primary hover:bg-gray-700 cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0 flex items-center gap-3"
            >
              <Search className="h-4 w-4 text-text-secondary" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background pt-safe-top px-4 pb-4 md:hidden flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6 mt-2 relative w-full">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 text-text-primary"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              {renderSearchContent(true)}
            </div>
            {/* Quick Links or Recent Searches could go here in a real app */}
            {!search && (
              <div className="mt-4 px-2">
                <h3 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Chest', 'Back', 'Cardio', 'Dumbbell'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleSuggestionClick(cat)}
                      className="px-4 py-2 bg-surface rounded-full text-sm text-text-primary border border-gray-700"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="flex flex-col items-center mt-8 sm:mt-12 p-5 text-center text-text-primary">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-8 sm:mb-12 tracking-tighter">
          Find Your Perfect Workout, <br className="hidden sm:block" />
          <span className="text-primary">Right Now</span>
        </h2>

        {/* Desktop Search */}
        <div className="hidden md:block w-full">
          {renderSearchContent(false)}
        </div>

        <div className="relative w-full max-w-7xl mt-4 md:mt-0">
          <div className="absolute top-0 left-0 h-full w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
