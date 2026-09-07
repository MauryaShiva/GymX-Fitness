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

  // Mobile search overlay state
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
    setIsMobileSearchOpen(false); // Close overlay on selection
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
      setIsMobileSearchOpen(false); // Close overlay on search
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

  const renderSearchContent = (isMobileOverlay = false) => (
    <>
      <div className={`relative w-full max-w-3xl ${isMobileOverlay ? 'mb-4' : 'mb-16'}`}>
        {/* ✅ Using a modern icon from lucide-react */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>
        {/* ✅ Revamped the input for a glassy, modern look */}
        <input
          ref={isMobileOverlay ? searchInputRef : null}
          className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        {/* ✅ Upgraded the button with a gradient and interactive effects */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 z-10"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* ✅ Styled the suggestions dropdown for a better look and feel */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobileOverlay && (
        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-0 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-0 pointer-events-none" />
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop / Inline Search Section */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
        {renderSearchContent(false)}
      </section>

      {/* Mobile Horizontal Scrollbar (Always visible on mobile) */}
      <div className="md:hidden w-full px-2 py-4 bg-gray-900">
         <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
      </div>

      {/* Mobile Full-Screen Overlay Search */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-xl flex flex-col p-4 pt-safe-top"
          >
            <div className="flex justify-between items-center mb-6 mt-4">
              <h2 className="text-2xl font-bold text-white">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {renderSearchContent(true)}
            <div className="mt-8 overflow-y-auto pb-safe">
               {/* Could add recent searches or popular categories here if needed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
