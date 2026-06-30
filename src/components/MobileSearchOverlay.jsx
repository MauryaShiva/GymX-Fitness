import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import allExercisesData from "../data/exercises.json";
import allBodyPartsData from "../data/bodyparts.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Load unique terms
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);

    // Load recent from local storage
    const saved = localStorage.getItem("gymx-recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Listen for global event to open
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    window.addEventListener("global-search", handleOpen);
    return () => window.removeEventListener("global-search", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  const saveRecent = (term) => {
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("gymx-recent-searches", JSON.stringify(updated));
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length > 1) {
      const filtered = allSearchTerms
        .filter((term) => term.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    saveRecent(term);
    handleClose();
    // Dispatch event for Home.jsx to handle the actual search logic
    window.dispatchEvent(new CustomEvent("execute-search", { detail: term }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      executeSearch(searchQuery.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col pt-safe pb-safe"
        >
          {/* Header */}
          <div className="flex items-center p-4 gap-3 border-b border-gray-800">
            <form onSubmit={onSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search exercises, muscles..."
                className="w-full bg-surface text-white h-12 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </form>
            <button onClick={handleClose} className="p-2 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchQuery.length > 1 ? (
              <ul className="space-y-1">
                {suggestions.map((s, i) => (
                  <li key={i}>
                    <button
                      onClick={() => executeSearch(s)}
                      className="w-full text-left px-4 py-3 bg-surface/50 rounded-lg text-gray-200 capitalize flex items-center justify-between hover:bg-surface"
                    >
                      <span>{s}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </li>
                ))}
                {suggestions.length === 0 && (
                  <div className="text-center text-gray-500 mt-10">No results found</div>
                )}
              </ul>
            ) : (
              <div>
                {recentSearches.length > 0 && (
                  <>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Searches</h3>
                    <ul className="space-y-1">
                      {recentSearches.map((s, i) => (
                        <li key={i}>
                          <button
                            onClick={() => executeSearch(s)}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-surface rounded-lg"
                          >
                            <History className="w-4 h-4 text-gray-500" />
                            <span className="capitalize">{s}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
