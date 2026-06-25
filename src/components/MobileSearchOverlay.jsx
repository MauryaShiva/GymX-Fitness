import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);

    // Load recent searches from local storage
    const saved = localStorage.getItem("gymx_recent_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse recent searches", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setSearch("");
      setSuggestions([]);
    }
  }, [isOpen]);

  const saveRecentSearch = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("gymx_recent_searches", JSON.stringify(updated));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleExecuteSearch = (term) => {
    if (!term) return;
    saveRecentSearch(term);
    onSearch(term);
    onClose();
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("gymx_recent_searches");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-background pt-safe pb-safe md:hidden flex flex-col"
        >
          {/* Header & Search Bar */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-800 bg-surface">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleExecuteSearch(search);
                  }
                }}
                placeholder="Search exercises..."
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSuggestions([]);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 font-medium px-2 py-2"
            >
              Cancel
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {search.length > 1 ? (
              <div className="flex flex-col gap-1">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleExecuteSearch(suggestion)}
                      className="flex items-center justify-between py-4 border-b border-gray-800/50 text-left"
                    >
                      <span className="text-white capitalize text-lg">{suggestion}</span>
                      <ArrowRight size={18} className="text-gray-500" />
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-10">No results found.</p>
                )}
              </div>
            ) : (
              recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wider">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecent}
                      className="text-primary text-sm font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-col">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleExecuteSearch(term)}
                        className="flex items-center gap-3 py-4 border-b border-gray-800/50 text-left"
                      >
                        <Clock size={18} className="text-gray-500" />
                        <span className="text-gray-200 capitalize flex-1 text-lg">
                          {term}
                        </span>
                        <ArrowRight size={16} className="text-gray-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
