import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
// Fallback if equipments.json doesn't exist, though it seems it did exist in the file system list
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Safely extract names depending on if it's an array of strings or objects with a 'name' property
    const bodyPartNames = allBodyPartsData.map((item) => typeof item === 'string' ? item : item.name);
    const equipmentNames = allEquipmentsData ? allEquipmentsData.map((item) => typeof item === 'string' ? item : item.name) : [];
    const exerciseNames = allExercisesData.map((item) => typeof item === 'string' ? item : item.name);

    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames].filter(Boolean)),
    ];
    setAllSearchTerms(uniqueTerms);

    const savedRecents = localStorage.getItem("gymx-recent-searches");
    if (savedRecents) {
      setRecentSearches(JSON.parse(savedRecents));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
      setSuggestions([]);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const filtered = allSearchTerms
        .filter((term) => term && term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const saveRecentSearch = (term) => {
    const newRecents = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(newRecents);
    localStorage.setItem("gymx-recent-searches", JSON.stringify(newRecents));
  };

  const executeSearch = (term) => {
    saveRecentSearch(term);
    onClose();
    // Navigate to home and trigger search via state
    navigate("/", { state: { executeSearch: term } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm) {
      const isValidSearch = allSearchTerms
        .map((term) => term && term.toLowerCase())
        .includes(searchTerm.toLowerCase());

      if (isValidSearch) {
        executeSearch(searchTerm);
      } else if (suggestions.length > 0) {
        executeSearch(suggestions[0]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          {/* Header */}
          <div className="pt-safe bg-surface border-b border-gray-800">
            <div className="flex items-center px-4 py-3 gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search exercises, equipment..."
                  className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchTerm && (
                  <button
                    onClick={() => { setSearchTerm(""); setSuggestions([]); inputRef.current?.focus(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button onClick={onClose} className="text-gray-400 font-medium">
                Cancel
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {searchTerm ? (
              <ul className="space-y-1">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => executeSearch(suggestion)}
                      className="w-full flex items-center gap-3 py-3 text-left text-white border-b border-gray-800 last:border-0"
                    >
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="capitalize">{suggestion}</span>
                    </button>
                  </li>
                ))}
                {suggestions.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    No results found for "{searchTerm}"
                  </div>
                )}
              </ul>
            ) : (
              recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wider">
                    Recent Searches
                  </h3>
                  <ul className="space-y-1">
                    {recentSearches.map((recent, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => executeSearch(recent)}
                          className="w-full flex items-center gap-3 py-3 text-left text-white border-b border-gray-800 last:border-0"
                        >
                          <History className="w-4 h-4 text-gray-500" />
                          <span className="capitalize">{recent}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
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
