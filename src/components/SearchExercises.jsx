import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

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
      setIsMobileSearchOpen(true);
      // Focus the input when opened could be done with a ref, but keeping logic simple
    };

    const handleExecuteSearch = (e) => {
      const term = e.detail;
      if (term) {
         setSearch(term);
         onSearch(term);
         setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("open-search", handleOpenSearch);
    window.addEventListener("execute-search", handleExecuteSearch);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("execute-search", handleExecuteSearch);
    };
  }, [onSearch]);

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
      setIsMobileSearchOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // NOTE: Replaced alert() with a more user-friendly custom modal or toast in a real app.
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };
  // --- End of Unchanged Logic ---

  const renderSearchContent = (isMobile = false) => (
    <>
      {/* ✅ Enhanced typography for a more impactful heading */}
      {!isMobile && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          {/* ✅ Made the gradient text more vibrant */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-3xl mb-16'}`}>
        {/* ✅ Using a modern icon from lucide-react */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        {/* ✅ Revamped the input for a glassy, modern look */}
        <input
          className={`w-full ${isMobile ? 'h-14 bg-surface text-text-primary pl-14 pr-4 border-b border-gray-700 rounded-none' : 'h-16 bg-gray-800/50 text-white border border-gray-700 rounded-full pl-16 pr-40 backdrop-blur-sm'} placeholder-gray-500 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300`}
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          autoFocus={isMobile}
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        {/* ✅ Upgraded the button with a gradient and interactive effects */}
        {!isMobile && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-teal-700 text-background font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary"
            onClick={handleLocalSearch}
          >
            Search
          </button>
        )}

        {/* ✅ Styled the suggestions dropdown for a better look and feel */}
        {suggestions.length > 0 && (
          <ul className={`absolute ${isMobile ? 'top-14 border-none shadow-none bg-background h-[calc(100vh-56px)]' : 'top-full mt-2 bg-surface border border-gray-700 rounded-xl shadow-lg'} w-full z-10 text-left overflow-y-auto`}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-5 ${isMobile ? 'py-4 border-b border-gray-800 text-lg' : 'py-3 text-gray-300 hover:bg-primary hover:text-background'} cursor-pointer transition-colors duration-200 capitalize`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Container for the scrollbar. The key is that the scrollbar itself is now also `relative` */}
      {!isMobile && (
        <div className="relative w-full max-w-7xl">
          {/* ✅ These gradients now sit at a lower z-index, behind the scrollbar's arrows */}
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
      {/* Desktop View */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center text-text-primary py-20">
        {renderSearchContent(false)}
      </section>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-surface border-b border-gray-800">
              <h2 className="text-xl font-bold text-text-primary">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               {renderSearchContent(true)}
               {/* Mobile Categories list when no search */}
               {suggestions.length === 0 && !search && (
                 <div className="p-4">
                    <h3 className="text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                       {bodyParts.map((item) => (
                         <button
                           key={item}
                           onClick={() => {
                             setBodyPart(item);
                             setIsMobileSearchOpen(false);
                             document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                           }}
                           className={`px-4 py-2 rounded-full text-sm font-medium capitalize border ${bodyPart === item ? 'bg-primary text-background border-primary' : 'bg-surface text-text-primary border-gray-700'}`}
                         >
                           {item}
                         </button>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
