import React, { useEffect, useState } from "react";
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
      if (window.innerWidth < 768) {
        setIsMobileSearchOpen(true);
      } else {
        document.getElementById("desktop-search-input")?.focus();
      }
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

  const renderSearchContent = (isMobile = false) => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16">
        {/* ✅ Using a modern icon from lucide-react */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>
        {/* ✅ Revamped the input for a glassy, modern look */}
        <input
          id={!isMobile ? "desktop-search-input" : undefined}
          className="w-full h-14 md:h-16 bg-[var(--color-surface)]/80 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-md transition-all duration-300 shadow-lg"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobile}
        />
        {/* ✅ Upgraded the button with a gradient and interactive effects */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-10 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 z-10"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* ✅ Styled the suggestions dropdown for a better look and feel */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-[var(--color-surface)] border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-y-auto max-h-60">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobile && (
        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Search View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center text-white py-10 md:py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
        {renderSearchContent(false)}
      </section>

      {/* Mobile Inline Fallback (when search not open, e.g., default body parts scrollbar) */}
      <section className="md:hidden flex flex-col items-center w-full px-4 mb-10 pt-4">
        <div className="w-full flex items-center justify-between mb-4">
           <h3 className="text-xl font-bold text-white">Categories</h3>
        </div>
        <div className="relative w-full">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </section>

      {/* Mobile Full Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[var(--color-background)] flex flex-col pt-safe-top pb-safe"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[var(--color-surface)]">
              <h2 className="text-xl font-bold text-white">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
              {renderSearchContent(true)}

              <div className="w-full mt-8">
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Quick Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {bodyParts.slice(0, 8).map((part) => (
                    <button
                      key={part}
                      onClick={() => {
                        setBodyPart(part);
                        setIsMobileSearchOpen(false);
                        setTimeout(() => {
                           document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="px-4 py-2 bg-[var(--color-surface)] border border-gray-700 rounded-full text-sm text-gray-300 capitalize active:scale-95 transition-transform"
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
