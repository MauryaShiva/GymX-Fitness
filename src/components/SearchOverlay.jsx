import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete before dispatching search event
      setTimeout(() => {
        const event = new CustomEvent("global-search", {
          detail: searchTerm,
        });
        window.dispatchEvent(event);
      }, 100);
    } else {
      const event = new CustomEvent("global-search", {
        detail: searchTerm,
      });
      window.dispatchEvent(event);
    }

    onClose();
  };

  const handleClear = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const recentSearches = ["chest", "squat", "dumbbell", "abs"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-white z-[60] flex flex-col pt-safe"
        >
          <div className="flex items-center px-4 py-3 border-b border-gray-100">
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 relative"
            >
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search exercises, muscles..."
                className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base py-1"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X size={16} />
                </button>
              )}
            </form>
            <button
              onClick={onClose}
              className="ml-4 text-sm font-medium text-red-500 active:text-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Recent Searches
            </h3>
            <ul className="space-y-3">
              {recentSearches.map((term, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSearchTerm(term);
                      // Execute search immediately
                      if (location.pathname !== "/") {
                        navigate("/");
                        setTimeout(() => {
                          window.dispatchEvent(
                            new CustomEvent("global-search", { detail: term })
                          );
                        }, 100);
                      } else {
                        window.dispatchEvent(
                          new CustomEvent("global-search", { detail: term })
                        );
                      }
                      onClose();
                    }}
                    className="w-full flex items-center justify-between py-2 text-left active:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center text-gray-700">
                      <Clock size={18} className="text-gray-400 mr-3" />
                      <span className="capitalize text-base">{term}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-300 group-active:text-gray-500"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
