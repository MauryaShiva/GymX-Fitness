import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // Mobile Search Overlay State
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  // Listen for the custom open-search event
  useEffect(() => {
    const handleOpenSearch = () => setIsMobileSearchOpen(true);
    window.addEventListener("open-search", handleOpenSearch);

    // Check if we navigated here with the search query param
    const params = new URLSearchParams(location.search);
    if (params.get("search") === "true") {
      setIsMobileSearchOpen(true);
      // Clean up URL without triggering reload
      navigate("/", { replace: true });
    }

    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, [location, navigate]);

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
    setIsMobileSearchOpen(false); // Close overlay on search
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false); // Close overlay on search
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Replaced alert() with something less aggressive in mobile
      console.warn("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };
  // --- End of Unchanged Logic ---

  // Function to render the inner search content to avoid focus loss issues
  const renderSearchContent = (isMobile = false) => (
    <>
      {isMobile && (
        <div className="flex justify-between items-center w-full mb-6 mt-safe-top pt-4">
          <h2 className="text-2xl font-bold text-white">Search</h2>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 bg-surface-light rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {!isMobile && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-white">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className={`relative w-full max-w-3xl ${isMobile ? 'mb-6' : 'mb-16'}`}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          className="w-full h-16 bg-surface-light text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobile}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface-light border border-gray-700 rounded-xl shadow-lg z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobile && (
        <div className="relative w-full max-w-7xl hidden md:block">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-0 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-0 pointer-events-none" />
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Search Section (Hidden on Mobile) */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center py-20">
        {renderSearchContent(false)}
      </section>

      {/* Mobile Horizontal Scrollbar (Always visible in content flow) */}
      <section className="md:hidden mt-8 w-full px-4">
        <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </section>

      {/* Full Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background p-4 flex flex-col items-center"
          >
            {renderSearchContent(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
