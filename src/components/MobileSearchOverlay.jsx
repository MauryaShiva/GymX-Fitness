import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, X, Clock } from "lucide-react";

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
    const savedRecents = localStorage.getItem("gymx_recent_searches");
    if (savedRecents) {
      try {
        setRecentSearches(JSON.parse(savedRecents));
      } catch (e) {
        console.error("Could not parse recent searches", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Focus input when overlay opens
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
    const updatedRecents = [term, ...recentSearches.filter(r => r !== term)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem("gymx_recent_searches", JSON.stringify(updatedRecents));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // Show slightly more suggestions on full screen
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
    onClose();
    setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocalSearch = () => {
    if (!search.trim()) return;
    saveRecentSearch(search);
    onSearch(search);
    setSuggestions([]);
    onClose();
    setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="fixed inset-0 z-[60] bg-gray-900 text-white flex flex-col pt-safe"
    >
      {/* Header / Search Bar Area */}
      <div className="flex items-center p-4 border-b border-gray-800 bg-gray-900 shadow-sm">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-gray-800 text-white rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search exercises..."
            value={search}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setSuggestions([]); inputRef.current?.focus(); }}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button onClick={onClose} className="ml-4 font-medium text-red-500 hover:text-red-400">
          Cancel
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-safe">
        {/* Suggestions */}
        {search.length > 1 && suggestions.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Suggestions</h3>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center text-left px-3 py-4 hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <Search size={16} className="text-gray-500 mr-3" />
                    <span className="capitalize text-gray-200 text-lg">{suggestion}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : search.length === 0 && recentSearches.length > 0 ? (
          /* Recent Searches */
          <div className="animate-in fade-in duration-300">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Recent Searches</h3>
                <button
                  onClick={() => { setRecentSearches([]); localStorage.removeItem("gymx_recent_searches"); }}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  Clear
                </button>
             </div>
             <ul className="space-y-1">
              {recentSearches.map((term, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSuggestionClick(term)}
                    className="w-full flex items-center text-left px-3 py-4 hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <Clock size={16} className="text-gray-500 mr-3" />
                    <span className="capitalize text-gray-300 text-lg">{term}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : search.length > 1 && suggestions.length === 0 ? (
           <div className="text-center text-gray-500 mt-10">
              No results found for "{search}"
           </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default MobileSearchOverlay;
