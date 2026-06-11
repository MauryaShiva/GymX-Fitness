import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, History } from 'lucide-react';
import Fuse from 'fuse.js';

const MobileSearchOverlay = ({ isOpen, onClose, onSearch, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Initialize Fuse for suggestions
  const fuse = new Fuse(data || [], {
    keys: ["name", "targetMuscles", "bodyParts"],
    threshold: 0.3,
    limit: 5,
  });

  useEffect(() => {
    // Load recent searches from local storage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = (term) => {
    if (term.trim()) {
      const updatedRecent = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    }

    onSearch(term);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const suggestions = searchTerm.trim() ? fuse.search(searchTerm).map(result => result.item.name) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl md:hidden flex flex-col pt-safe"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search exercises, muscles..."
                className="flex-1 bg-transparent border-none outline-none text-base w-full"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}>
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 font-medium text-red-500"
            >
              Cancel
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {searchTerm ? (
              // Suggestions
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Suggestions</h3>
                {suggestions.length > 0 ? (
                  <ul className="space-y-4">
                    {suggestions.map((suggestion, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSearch(suggestion)}
                          className="flex items-center w-full text-left text-gray-800"
                        >
                          <Search size={18} className="text-gray-300 mr-3" />
                          <span className="capitalize">{suggestion}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center mt-8">No matching exercises found.</p>
                )}
              </div>
            ) : (
              // Recent Searches
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Searches</h3>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={() => { setRecentSearches([]); localStorage.removeItem('recentSearches'); }}
                      className="text-xs text-red-500 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {recentSearches.length > 0 ? (
                  <ul className="space-y-4">
                    {recentSearches.map((term, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSearch(term)}
                          className="flex items-center w-full text-left text-gray-800"
                        >
                          <History size={18} className="text-gray-300 mr-3" />
                          <span className="capitalize">{term}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm italic">No recent searches</p>
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
