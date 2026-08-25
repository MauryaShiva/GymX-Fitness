import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // New state for mobile search overlay
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
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

    const savedSearches = localStorage.getItem("gymx-recent-searches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  const saveRecentSearch = (term) => {
    if (!term) return;
    const newRecent = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem("gymx-recent-searches", JSON.stringify(newRecent));
  };

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
    saveRecentSearch(suggestion);
    onSearch(suggestion);
    setIsMobileSearchOpen(false);
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
      saveRecentSearch(search);
      setIsMobileSearchOpen(false);
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };
  // --- End of Unchanged Logic ---

  const renderSearchContent = () => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={searchInputRef}
          className="w-full h-14 md:h-16 bg-surface/50 text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-[120px] md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-10 md:h-12 px-6 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-xl z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 md:py-4 text-text-secondary hover:bg-gray-800 hover:text-text-primary cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
              >
                <Search size={16} className="opacity-50" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isMobileSearchOpen && recentSearches.length > 0 && suggestions.length === 0 && (
        <div className="w-full text-left mb-8 px-4">
          <h3 className="text-text-secondary text-sm font-semibold mb-4">Recent Searches</h3>
          <ul className="space-y-2">
            {recentSearches.map((term, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(term)}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 active:bg-surface text-text-primary capitalize"
              >
                <Clock size={16} className="text-text-secondary" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <>
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-background text-text-primary py-10 md:py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>
        {renderSearchContent()}

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

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-background pt-safe-top flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-text-primary">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary rounded-full bg-surface"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-32 relative">
               {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile inline fallback for the scrollbar so users can still select categories without opening search overlay */}
      <section className="md:hidden flex flex-col items-center mt-6 px-4">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default SearchExercises;
