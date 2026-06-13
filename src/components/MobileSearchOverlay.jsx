import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft } from 'lucide-react';
import allSearchTermsData from '../data/bodyparts.json'; // Will use full list similar to SearchExercises
import allExercisesData from '../data/exercises.json';
import allEquipmentsData from '../data/equipments.json';

const MobileSearchOverlay = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const bodyPartNames = allSearchTermsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearch("");
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const navigate = useNavigate();

  const handleSearch = (term) => {
    navigate('/');
    // Use a short timeout to ensure Home component is mounted if navigating from another route
    setTimeout(() => {
      const event = new CustomEvent('global-search', { detail: term });
      window.dispatchEvent(event);
    }, 50);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search) {
      handleSearch(search);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-white pt-safe flex flex-col md:hidden"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 shadow-sm">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 ml-2 relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search exercises, muscles..."
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Suggestions Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 pb-safe">
             {suggestions.length > 0 ? (
                <ul className="divide-y divide-gray-100 bg-white">
                  {suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left px-5 py-4 text-gray-800 flex items-center hover:bg-gray-50 active:bg-gray-100 capitalize"
                      >
                        <Search size={16} className="text-gray-400 mr-3" />
                        {suggestion}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : search.length > 1 ? (
                <div className="p-8 text-center text-gray-500">
                   No results found for "{search}"
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                   Type to start searching...
                </div>
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
