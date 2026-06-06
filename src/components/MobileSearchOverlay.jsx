import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import allExercisesData from "../data/exercises.json";
import allBodyPartsData from "../data/bodyparts.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(["chest", "dumbbells", "squat"]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Create Fuse instance for suggestions
  const [fuse] = useState(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const allSearchTerms = [...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames])];

    return new Fuse(
      allSearchTerms.map(term => ({ term })),
      { keys: ["term"], threshold: 0.3 }
    );
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 1) {
      const results = fuse.search(value);
      setSuggestions(results.slice(0, 5).map(result => result.item.term));
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    if (!term.trim()) return;

    // Update recent searches
    const updatedRecents = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updatedRecents);

    // Trigger search
    if (onSearch) {
        onSearch(term);
    }

    // Navigate home if not already there, and close
    navigate("/", { state: { searchTerm: term } });
    onClose();

    // Scroll to exercises after slight delay to ensure render
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(searchQuery);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
        >
          {/* Header & Search Input */}
          <div className="flex items-center p-4 border-b border-gray-800 bg-surface">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search exercises, muscles..."
                className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Suggestions or Recent Searches */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchQuery.length > 1 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Suggestions</h3>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => executeSearch(suggestion)}
                        className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
                      >
                        <Search className="w-4 h-4 text-gray-500 mr-3" />
                        <span className="text-white capitalize flex-1">{suggestion}</span>
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </li>
                  ))}
                  {suggestions.length === 0 && (
                     <p className="text-gray-500 text-center mt-4">No results found for "{searchQuery}"</p>
                  )}
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((recent, index) => (
                    <button
                      key={index}
                      onClick={() => executeSearch(recent)}
                      className="flex items-center bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors capitalize"
                    >
                      <Clock className="w-3 h-3 mr-2 text-gray-500" />
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;