import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Custom overlay state for mobile search
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    // Prevent body scroll when search is open on mobile
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileSearchOpen]);

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

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    if (isMobileSearchOpen) {
      setIsMobileSearchOpen(false);
    }
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
      if (isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
      }
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

  const renderSearchContent = (isMobile) => (
    <div className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-3xl mb-16'}`}>
      {/* ✅ Using a modern icon from lucide-react */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      {/* ✅ Revamped the input for a glassy, modern look */}
      <input
        ref={isMobile ? searchInputRef : null}
        className={`w-full bg-surface text-white placeholder-gray-500 border border-gray-700 py-2 pl-14 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
          isMobile
            ? 'h-14 rounded-xl pr-4'
            : 'h-16 rounded-full pr-40 bg-surface/50 backdrop-blur-sm shadow-xl'
        }`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />

      {/* Search Button (Desktop Only) */}
      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {/* ✅ Styled the suggestions dropdown for a better look and feel */}
      {suggestions.length > 0 && (
        <ul className={`absolute mt-2 w-full bg-surface border border-gray-700 shadow-2xl z-20 text-left overflow-hidden ${
          isMobile ? 'top-full left-0 rounded-xl' : 'top-full rounded-xl'
        }`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-300 border-b border-gray-800 last:border-0 hover:bg-surface-hover hover:text-primary cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-gray-500" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-transparent text-white py-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-10 tracking-tight">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
            Right Now
          </span>
        </h2>

        {renderSearchContent(false)}

        <div className="relative w-full max-w-7xl mt-8">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Inline Categories */}
      <section className="md:hidden pt-4 pb-2 px-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Categories</h2>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
        <div className="relative w-full mx-[-16px] px-[16px] overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Full Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl md:hidden pt-safe-top"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <button
                  onClick={closeMobileSearch}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-gray-300 active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex-1 relative z-[110]">
                  {renderSearchContent(true)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 pb-safe">
                {search === "" && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Popular Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["all", "back", "cardio", "chest", "lower arms", "lower legs"].map((part) => (
                        <button
                          key={part}
                          onClick={() => {
                            setBodyPart(part);
                            closeMobileSearch();
                            document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-full bg-surface border border-gray-700 text-sm font-medium capitalize active:bg-primary active:border-primary active:text-white transition-colors"
                        >
                          {part}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
