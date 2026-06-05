import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock } from 'lucide-react';
import allExercisesData from '../data/exercises.json';

const MobileSearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Setup basic search data source similar to SearchExercises.jsx
  const allSearchTerms = [
    ...new Set(allExercisesData.map((e) => e.name)),
    ...new Set(allExercisesData.flatMap((e) => e.targetMuscles)),
    ...new Set(allExercisesData.flatMap((e) => e.equipments)),
    ...new Set(allExercisesData.flatMap((e) => e.bodyParts)),
  ];

  useEffect(() => {
    // Load recent searches from local storage
    const saved = localStorage.getItem('gymx_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const filtered = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const executeSearch = (term) => {
    if (!term) return;

    // Save to recents
    const updatedRecents = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem('gymx_recent_searches', JSON.stringify(updatedRecents));

    setSearchTerm('');
    setSuggestions([]);
    onSearch(term);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-[#0f0f0f] text-white flex flex-col pt-[env(safe-area-inset-top)]"
        >
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-800">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchTerm)}
                placeholder="Search exercises, muscles..."
                className="w-full bg-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button onClick={onClose} className="ml-4 p-2 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {searchTerm.length > 1 ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Suggestions</h3>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        onClick={() => executeSearch(suggestion)}
                        className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors capitalize"
                      >
                        <Search className="w-4 h-4 mr-3 text-gray-500" />
                        {suggestion}
                      </button>
                    </li>
                  ))}
                  {suggestions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No results found.</p>
                  )}
                </ul>
              </div>
            ) : (
              <div>
                {recentSearches.length > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Searches</h3>
                      <button
                        onClick={() => { setRecentSearches([]); localStorage.removeItem('gymx_recent_searches'); }}
                        className="text-xs text-red-500 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {recentSearches.map((term, index) => (
                        <li key={index}>
                          <button
                            onClick={() => executeSearch(term)}
                            className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors capitalize"
                          >
                            <Clock className="w-4 h-4 mr-3 text-gray-500" />
                            {term}
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
