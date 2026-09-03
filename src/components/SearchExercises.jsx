import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOverlayOpen(true);
      // Optional: Prevent background scrolling
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      document.body.style.overflow = "unset";
    };
  }, []);

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    document.body.style.overflow = "unset";
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
    closeOverlay();

    // Ensure smooth scrolling happens after overlay closes
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      closeOverlay();

      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Allow partial matches or just pass the search term to Fuse.js
      if (search.trim()) {
         onSearch(search);
         setSuggestions([]);
         closeOverlay();
         setTimeout(() => {
           document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
         }, 100);
      } else {
        alert("Please enter a valid search term.");
      }
    }
  };

  const renderSearchContent = () => (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-center">
        Find Your Perfect Workout, <br />
        <span className="text-primary">Right Now</span>
      </h2>

      <div className="relative w-full max-w-3xl mb-16 px-4">
        <div className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>

        <input
          className="w-full h-16 bg-surface/50 text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-16 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleLocalSearch()}
          autoFocus={isOverlayOpen}
        />

        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 rounded-full hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-[calc(100%-2rem)] left-4 bg-surface border border-gray-700 rounded-xl shadow-2xl z-10 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 text-text-secondary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
             setBodyPart(part);
             closeOverlay();
             setTimeout(() => {
               document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
             }, 100);
          }}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Inline Search (Hidden on Mobile) */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 bg-background text-text-primary py-20">
        {renderSearchContent()}
      </section>

      {/* Mobile Full-Screen Overlay Search */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto pt-safe-top pb-safe px-4"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={closeOverlay}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="pt-8 pb-20">
              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
