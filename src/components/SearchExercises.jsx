import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
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
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      // Focus input when overlay opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
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
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };
  // --- End of Unchanged Logic ---

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? "max-w-full" : "max-w-3xl mb-16"}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? searchInputRef : null}
        className={`w-full bg-surface/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 ${
          isMobile ? "h-14 pr-14" : "h-16 pr-40"
        }`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />

      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-8 rounded-full text-lg hover:bg-primary-dark transition-colors"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {isMobile && search && (
        <button
          onClick={() => {
            setSearch("");
            setSuggestions([]);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden max-h-[60vh] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
            >
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
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-safe-top"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 rounded-full bg-surface text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto pb-safe">
              {renderSearchContent(true)}

              {!search && (
                <div className="mt-8">
                  <h3 className="text-gray-400 font-medium mb-4 px-2">Popular Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {bodyParts.slice(0, 8).map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setBodyPart(item);
                          setIsMobileSearchOpen(false);
                          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 bg-surface rounded-full text-sm capitalize border border-gray-800 text-gray-300"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Inline Search (Hidden on Mobile) */}
      <section className="flex flex-col items-center mt-12 p-5 text-center bg-background text-white py-10 md:py-20 hidden md:flex">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>

        {renderSearchContent(false)}

        <div className="relative w-full max-w-7xl">
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

      {/* Mobile Horizontal Scrollbar (Visible only on mobile when not searching) */}
      <section className="md:hidden mt-4 p-4">
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
