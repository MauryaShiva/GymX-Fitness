import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    };

    window.addEventListener("open-search", handleOpenSearch);

    // Check if we should open search based on URL params on mount
    const params = new URLSearchParams(location.search);
    if (params.get("search") === "true") {
      handleOpenSearch();
    }

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [location.search]);

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    // Clean up URL if we were opened via query param
    const params = new URLSearchParams(location.search);
    if (params.get("search") === "true") {
      navigate(location.pathname, { replace: true });
    }
  };

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
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-3xl mb-16'}`}>
      <div className={`absolute left-5 top-1/2 -translate-y-1/2 ${isMobile ? 'text-gray-400' : 'text-gray-400 pointer-events-none'}`}>
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? inputRef : null}
        className={`w-full h-16 bg-surface text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 ${isMobile ? 'pr-4' : 'pr-40'} text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300`}
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles, equipment..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      {!isMobile && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-8 rounded-full text-lg hover:bg-red-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          onClick={handleLocalSearch}
        >
          Search
        </button>
      )}

      {suggestions.length > 0 && (
        <ul className={`absolute ${isMobile ? 'top-20' : 'top-full mt-2'} w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden max-h-60 overflow-y-auto`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-text-primary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Search Section */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-background text-text-primary py-20">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>

        {renderSearchContent()}

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
      </section>

      {/* Mobile Horizontal Categories (Always visible) */}
      <section className="md:hidden mt-4 p-4 bg-background">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background pt-safe-top flex flex-col md:hidden"
          >
            <div className="p-4 flex items-center gap-4 bg-surface/90 backdrop-blur-md border-b border-gray-800">
              <button
                onClick={closeMobileSearch}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors bg-gray-800 rounded-full shrink-0"
              >
                <X size={24} />
              </button>
              {renderSearchContent(true)}
            </div>

            {/* Quick Categories in Search Overlay */}
            {!search && suggestions.length === 0 && (
              <div className="flex-1 overflow-y-auto p-4 pb-safe">
                <h3 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider">Quick Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {bodyParts.slice(0, 8).map((part) => (
                    <button
                      key={part}
                      onClick={() => {
                        setBodyPart(part);
                        closeMobileSearch();
                        setTimeout(() => {
                          document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="bg-surface border border-gray-800 px-4 py-2 rounded-full text-text-primary capitalize hover:bg-gray-800 hover:border-gray-600 transition-colors"
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
