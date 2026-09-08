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
      // Focus input after animation
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isMobileSearchOpen]);

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
    setIsMobileSearchOpen(false);
    onSearch(suggestion);
    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      setIsMobileSearchOpen(false);
      onSearch(search);
      setSuggestions([]);
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    } else if (search) {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    searchInputRef.current?.focus();
  };

  const renderSearchContent = (isMobileOverlay = false) => (
    <div className={`relative w-full max-w-3xl ${isMobileOverlay ? 'px-4' : 'mb-16'}`}>
      <div className="absolute left-5 md:left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none z-10">
        <Search className="h-5 w-5 md:h-6 md:w-6" />
      </div>

      <input
        ref={isMobileOverlay ? searchInputRef : null}
        className="w-full h-14 md:h-16 bg-surface border border-border text-text-primary placeholder-text-muted rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
      />

      {/* Clear Button (Mobile mostly) */}
      {search && isMobileOverlay && (
        <button
          onClick={clearSearch}
          className="absolute right-[100px] top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Desktop Search Button */}
      {!isMobileOverlay && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:bg-primary-hover active:scale-95 transition-all shadow-md focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {/* Mobile Search Button */}
      {isMobileOverlay && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-10 px-4 rounded-full text-sm hover:bg-primary-hover active:scale-95 transition-all shadow-md focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-xl z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-text-primary hover:bg-surface-hover hover:text-primary cursor-pointer transition-colors border-b border-border last:border-0 capitalize flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-text-muted" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <section className="flex flex-col items-center mt-6 md:mt-12 p-5 text-center bg-background text-text-primary py-10 md:py-20">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tight">
          Find Your Perfect Workout, <br />
          <span className="text-primary drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            Right Now
          </span>
        </h2>

        {/* Desktop Search - Hidden on small mobile to favor the overlay */}
        <div className="hidden md:block w-full flex justify-center">
          {renderSearchContent(false)}
        </div>

        {/* Mobile Search Trigger */}
        <div className="md:hidden w-full max-w-sm mb-12">
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="w-full h-14 bg-surface border border-border rounded-full flex items-center px-5 text-text-muted shadow-sm active:scale-[0.98] transition-transform"
          >
            <Search className="w-5 h-5 mr-3" />
            <span className="text-base">Search exercises...</span>
          </button>
        </div>

        <div className="relative w-full max-w-7xl mt-4 md:mt-0">
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
            <div className="flex items-center justify-between p-4 border-b border-border glass">
              <h3 className="font-bold text-lg text-text-primary">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 rounded-full bg-surface text-text-secondary hover:text-primary active:scale-95 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 pt-6 flex-grow overflow-y-auto">
              {renderSearchContent(true)}

              {!search && (
                <div className="mt-8 px-2">
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Quick Browse</h4>
                  <div className="flex flex-wrap gap-2">
                    {bodyParts.slice(0, 8).map((bp) => (
                      <button
                        key={bp}
                        onClick={() => {
                          setBodyPart(bp);
                          setIsMobileSearchOpen(false);
                          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 bg-surface border border-border rounded-full text-sm capitalize text-text-primary active:bg-surface-hover"
                      >
                        {bp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
