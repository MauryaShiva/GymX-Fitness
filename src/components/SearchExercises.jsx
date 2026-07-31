import React, { useEffect, useState } from "react";
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
    };

    window.addEventListener("open-search", handleOpenSearch);

    // Check if URL has ?search=true
    if (window.location.search.includes('search=true')) {
        setIsMobileSearchOpen(true);
        // Clean URL without reloading
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
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

  const closeMobileSearch = () => {
      setIsMobileSearchOpen(false);
  };

  const renderSearchContent = () => (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div className="relative w-full mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          className="w-full h-16 bg-surface text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-[120px] sm:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobileSearchOpen}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-12 px-6 sm:px-8 rounded-full text-sm sm:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-primary hover:text-background cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
            setBodyPart(part);
            setIsMobileSearchOpen(false);
          }}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Search Section */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center w-full">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>
        {renderSearchContent()}
      </section>

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
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-text-primary">Search</h2>
              <button
                onClick={closeMobileSearch}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-8">
               <h2 className="text-3xl font-extrabold mb-8 text-text-primary text-center">
                  Find Your Perfect Workout, <br />
                  <span className="text-primary">Right Now</span>
                </h2>
              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
