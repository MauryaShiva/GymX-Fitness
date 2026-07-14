import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
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

    const saved = localStorage.getItem("gymx-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenSearch = () => setIsMobileSearchOpen(true);
    window.addEventListener("open-search", handleOpenSearch);

    // Check if router state has an executeSearch command
    if (location.state && location.state.executeSearch) {
      setSearch(location.state.executeSearch);
      onSearch(location.state.executeSearch);
      // Clear the state so it doesn't trigger again on re-renders
      window.history.replaceState({}, document.title);
    }

    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, [location, onSearch]);

  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileSearchOpen]);

  const saveRecentSearch = (term) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("gymx-recent-searches", JSON.stringify(updated));
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
    saveRecentSearch(suggestion);
    setIsMobileSearchOpen(false);
    onSearch(suggestion);
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      saveRecentSearch(search);
      setIsMobileSearchOpen(false);
      onSearch(search);
      setSuggestions([]);
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const handleRecentSearchClick = (term) => {
    setSearch(term);
    saveRecentSearch(term);
    setIsMobileSearchOpen(false);
    onSearch(term);
    setTimeout(() => {
       document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearch("");
    setSuggestions([]);
  };
  // --- End of Unchanged Logic ---

  // Refactored to render as a function instead of a component to avoid focus loss
  const renderSearchContent = () => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>
        <input
          className="w-full h-14 md:h-16 bg-surface text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobileSearchOpen}
        />
        <button
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-11 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-gray-800 hover:text-primary cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800/50 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isMobileSearchOpen && recentSearches.length > 0 && suggestions.length === 0 && (
        <div className="w-full max-w-3xl text-left px-4">
          <h3 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider">Recent Searches</h3>
          <div className="flex flex-col gap-2">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(term)}
                className="flex items-center gap-3 w-full p-3 bg-surface rounded-lg text-text-primary active:bg-gray-800 transition-colors capitalize text-left"
              >
                <History className="text-text-secondary" size={18} />
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Search Section */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-background text-text-primary py-20 relative">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>

        {renderSearchContent()}

        <div className="relative w-full max-w-7xl mt-8">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Inline Scrollbar (visible when not searching) */}
      <div className="md:hidden block w-full px-2 mt-8 mb-4 relative">
         <h2 className="text-2xl font-bold mb-4 ml-4 text-text-primary">
          Categories
        </h2>
        <div className="absolute top-12 left-0 h-24 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-12 right-0 h-24 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      {/* Full-Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background pt-safe-top flex flex-col md:hidden overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-surface/50 backdrop-blur-md">
              <h2 className="text-xl font-bold text-text-primary">Search</h2>
              <button
                onClick={closeMobileSearch}
                className="p-2 text-text-secondary hover:text-text-primary rounded-full bg-surface"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto pb-[200px]">
              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
