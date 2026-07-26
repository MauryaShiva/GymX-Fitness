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
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

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

  const executeSearch = (term) => {
    onSearch(term);
    setSearch("");
    setSuggestions([]);
    setIsOpen(false);

    // Smooth scroll is handled in Home.jsx or via router
    setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    executeSearch(suggestion);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      executeSearch(search);
    } else {
      // Allow searching for whatever they typed anyway to let Fuse.js handle it
      if (search) {
          executeSearch(search);
      }
    }
  };

  const closeSearch = () => {
      setIsOpen(false);
      setSearch("");
      setSuggestions([]);
  };

  const renderSearchContent = () => (
    <div className="w-full max-w-3xl mx-auto mt-4 px-4">
        <div className="relative w-full mb-8">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="h-6 w-6" />
            </div>
            <input
            ref={inputRef}
            className="w-full h-16 bg-gray-800/80 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-24 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            value={search}
            onChange={handleInputChange}
            placeholder="Search exercises, muscles..."
            type="text"
            onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
            onClick={(e) => e.target.select()}
            />
            {search && (
              <button
                  onClick={() => setSearch("")}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                  <X className="h-5 w-5" />
              </button>
            )}
            <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white font-bold h-12 px-5 md:px-8 rounded-full text-sm md:text-lg hover:bg-red-700 active:scale-95 transform transition-all duration-300 focus:outline-none"
            onClick={handleLocalSearch}
            >
            Go
            </button>

            {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
                {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize flex items-center gap-3"
                >
                    <Search className="w-4 h-4 opacity-50" />
                    {suggestion}
                </li>
                ))}
            </ul>
            )}
        </div>

        <div className="mb-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider pl-2">Browse Categories</h3>
            <div className="relative w-full">
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                <HorizontalScrollbar
                data={bodyParts}
                bodyPart={bodyPart}
                setBodyPart={(part) => {
                    setBodyPart(part);
                    closeSearch();
                    setTimeout(() => {
                        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}
                isBodyParts
                />
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    </div>
  );

  return (
    <>
      {/* Inline non-overlay version for Desktop context (if needed, but mostly we rely on the overlay now) */}
      <div className="hidden md:block w-full">
         <section className="flex flex-col items-center mt-12 p-5 text-center bg-transparent text-white py-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 tracking-tighter">
                Find Your Perfect Workout, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Right Now
                </span>
            </h2>
            {renderSearchContent()}
        </section>
      </div>

      {/* Mobile/Global Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col pt-safe-top"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Search</h2>
                <button
                    onClick={closeSearch}
                    className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-safe">
                <div className="pt-6">
                    {renderSearchContent()}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
