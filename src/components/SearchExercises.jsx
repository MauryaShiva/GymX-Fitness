import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile search overlay state
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
    setBodyParts(["all", ...bodyPartNames]);
  }, []);

  // Listen for custom search event and query param
  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    window.addEventListener("open-search", handleOpenSearch);

    if (searchParams.get("search") === "true") {
      handleOpenSearch();
      // Remove query param without navigating away
      navigate("/", { replace: true });
    }

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [searchParams, navigate]);

  const handleCloseSearch = () => {
    setIsMobileSearchOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    setIsMobileSearchOpen(false);

    // Use a small timeout to let the overlay close before scrolling
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false);

      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };
  // --- End of Unchanged Logic ---

  // Extracted inner content to a function to prevent focus loss during rerenders
  const renderSearchContent = (isMobile = false) => (
    <>
      {!isMobile && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className={`relative w-full max-w-3xl ${isMobile ? 'mb-4' : 'mb-16'}`}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>

        <input
          ref={isMobile ? inputRef : null}
          className="w-full h-16 bg-surface/50 text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-16 pr-24 sm:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-red-800 text-white font-bold h-12 px-4 sm:px-8 rounded-full text-sm sm:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-lg z-50 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobile && (
        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Search Section (Hidden on mobile overlay open) */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-background text-text-primary py-20">
        {renderSearchContent()}
      </section>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-safe-top"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={handleCloseSearch}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto pb-safe">
              {renderSearchContent(true)}

              <div className="mt-8">
                <h4 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {bodyParts.slice(0, 8).map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setBodyPart(item);
                        handleCloseSearch();
                        setTimeout(() => {
                          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        bodyPart === item
                          ? "bg-primary text-white"
                          : "bg-surface text-text-secondary hover:bg-gray-700 hover:text-white"
                      } capitalize`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile inline horizontal scrollbar when overlay is closed */}
      <div className="md:hidden w-full px-4 mt-8">
        <div className="relative w-full">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
        </div>
      </div>
    </>
  );
};

export default SearchExercises;
