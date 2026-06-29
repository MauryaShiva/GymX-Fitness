import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock } from 'lucide-react';
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";

const MobileSearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Populate search terms
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    onSearch(term);
    onClose();
    setSearchQuery('');
    setSuggestions([]);
    setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    if (searchQuery.trim()) {
      executeSearch(searchQuery);
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
          className="fixed inset-0 z-[100] bg-background pt-safe flex flex-col md:hidden"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-4 border-b border-gray-800">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-surface text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleLocalSearch()}
              />
            </div>
            <button onClick={onClose} className="ml-4 p-2 text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Suggestions List */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion, idx) => (
                  <motion.li
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => executeSearch(suggestion)}
                    className="flex items-center py-3 border-b border-gray-800/50 text-gray-300 active:bg-gray-800 rounded px-2"
                  >
                    <Search className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="capitalize">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 text-center text-gray-500 flex flex-col items-center">
                 <Search className="h-12 w-12 mb-4 opacity-20" />
                 <p>Type to search for exercises, muscles, or equipment</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
