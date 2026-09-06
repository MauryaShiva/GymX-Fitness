import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    const handleOpenSearch = () => setIsOverlayOpen(true);
    window.addEventListener("open-search", handleOpenSearch);

    // Check URL query parameters for search
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("search") === "true") {
      setIsOverlayOpen(true);
      // Clean up URL without triggering navigation
      navigate(location.pathname, { replace: true });
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
    setIsOverlayOpen(false); // Close overlay on mobile
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsOverlayOpen(false);
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSearch("");
    setSuggestions([]);
  };

  // Render function pattern to prevent focus loss during keystrokes
  const renderSearchContent = (isMobile = false) => (
    <div className={`flex flex-col items-center ${isMobile ? 'mt-4 px-4' : 'mt-12 p-5'} text-center w-full max-w-3xl mx-auto`}>
      {!isMobile && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className="relative w-full mb-8">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>

        <input
          className={`w-full h-16 bg-surface text-text-primary placeholder-text-secondary border border-gray-800 rounded-full py-2 pl-14 ${isMobile ? 'pr-16' : 'pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm`}
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobile}
        />

        {isMobile && search && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-2 z-10"
            onClick={() => { setSearch(""); setSuggestions([]); }}
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {!isMobile && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg focus:outline-none z-10"
            onClick={handleLocalSearch}
          >
            Search
          </button>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-800 rounded-xl shadow-lg z-50 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-4 text-text-primary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800/50 last:border-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isMobile && (
        <div className="relative w-full max-w-7xl">
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:flex flex-col items-center bg-background py-10 w-full">
        {renderSearchContent()}
      </section>

      {/* Mobile Modal Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-background md:hidden pt-safe-top"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={closeOverlay}
                className="p-2 text-text-secondary hover:text-text-primary rounded-full bg-surface"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-full overflow-y-auto pb-safe">
              {renderSearchContent(true)}
              <div className="px-4 mt-6">
                <h4 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider">Browse Categories</h4>
                <div className="grid grid-cols-2 gap-3 pb-20">
                  {bodyParts.filter(part => part !== 'all').slice(0, 8).map((part) => (
                    <button
                      key={part}
                      onClick={() => {
                        setBodyPart(part);
                        closeOverlay();
                        setTimeout(() => {
                          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }}
                      className="bg-surface border border-gray-800 rounded-lg p-4 text-center text-text-primary capitalize font-medium active:scale-95 transition-transform"
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always show body parts scrollbar on mobile below hero */}
      <section className="md:hidden w-full relative py-6">
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </section>
    </>
  );
};

export default SearchExercises;
