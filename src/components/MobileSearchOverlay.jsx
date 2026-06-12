import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";

const MobileSearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      onClose();
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
          className="fixed inset-0 z-[100] bg-white flex flex-col pt-safe"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 shadow-sm">
            <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search exercises..."
                className="w-full bg-gray-100 text-gray-900 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
              />
            </form>
            <button
              onClick={onClose}
              className="ml-4 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick links/Suggestions (Optional mock logic for demo) */}
          <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Chest", "Back", "Legs", "Abs", "Cardio", "Dumbbell"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    onSearch(term);
                    onClose();
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
