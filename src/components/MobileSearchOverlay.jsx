import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import allExercisesData from "../data/exercises.json";
import allBodyPartsData from "../data/bodyparts.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Dummy recent searches for UI realism
  const [recentSearches, setRecentSearches] = useState(["chest", "dumbbells", "push up"]);

  useEffect(() => {
    // Collect all valid search terms for suggestions
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);

    // Listen to custom event to open overlay
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-mobile-search', handleOpen);

    return () => {
      window.removeEventListener('open-mobile-search', handleOpen);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const filtered = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // Show up to 8 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    if (!term) return;

    // Update recent searches
    if (!recentSearches.includes(term.toLowerCase())) {
        setRecentSearches([term.toLowerCase(), ...recentSearches].slice(0, 5));
    }

    // Close overlay
    setIsOpen(false);
    setSearchTerm("");

    // Dispatch custom event that Home.jsx will catch
    const event = new CustomEvent('execute-search', { detail: term });
    window.dispatchEvent(event);

    // Scroll to exercises
    setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#121212] flex flex-col pt-safe"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-4 border-b border-gray-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search exercises, muscles..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchTerm)}
                className="w-full bg-gray-800/50 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-4 text-gray-400 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {searchTerm.length > 1 ? (
              // Suggestions View
              <div className="space-y-4">
                <h3 className="text-gray-400 font-medium text-sm tracking-wide uppercase">Suggestions</h3>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => executeSearch(suggestion)}
                        className="w-full flex items-center justify-between text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="text-white capitalize">{suggestion}</span>
                        <ArrowRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </li>
                  ))}
                  {suggestions.length === 0 && (
                     <p className="text-gray-500 text-center py-8">No results found for "{searchTerm}"</p>
                  )}
                </ul>
              </div>
            ) : (
              // Recent Searches View
              <div className="space-y-4">
                <h3 className="text-gray-400 font-medium text-sm tracking-wide uppercase">Recent Searches</h3>
                <ul className="space-y-2">
                  {recentSearches.map((term, index) => (
                    <li key={index}>
                      <button
                        onClick={() => executeSearch(term)}
                        className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300 capitalize">{term}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
