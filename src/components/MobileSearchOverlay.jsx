import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8); // Show up to 8 suggestions on mobile
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    onClose();
    setSearch("");
    setSuggestions([]);

    // We navigate to home with the state to trigger the search.
    // We'll need to update Home.jsx to listen to this state.
    // Alternatively, fire a custom event that Home.jsx listens to.
    window.dispatchEvent(new CustomEvent('execute-search', { detail: term }));
    navigate('/', { state: { executeSearch: term } });
  };

  const handleSuggestionClick = (suggestion) => {
    executeSearch(suggestion);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      executeSearch(search.trim());
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
          className="fixed inset-0 z-[60] bg-gray-950 flex flex-col pt-safe"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                autoFocus
                placeholder="Search exercises, muscles..."
                value={search}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </form>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex-1 overflow-y-auto pb-safe">
            {suggestions.length > 0 ? (
              <ul className="divide-y divide-gray-800">
                {suggestions.map((suggestion, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-6 py-4 text-gray-300 active:bg-gray-800 capitalize flex items-center gap-3 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            ) : (
              search.length > 1 && (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{search}"
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
