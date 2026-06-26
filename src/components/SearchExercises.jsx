import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  useEffect(() => {
    const handleGlobalSearch = () => {
      setIsSearchOverlayOpen(true);
      // Let the modal open, then focus the input
      setTimeout(() => {
        document.getElementById("mobile-search-input")?.focus();
      }, 100);
    };

    window.addEventListener("global-search", handleGlobalSearch);
    return () => window.removeEventListener("global-search", handleGlobalSearch);
  }, []);

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

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsSearchOverlayOpen(false);
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Basic validation feedback
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    setIsSearchOverlayOpen(false);
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  // --- End of Unchanged Logic ---

  return (
    <section className="flex flex-col items-center mt-12 p-5 text-center text-text-primary py-10 md:py-20 relative">
      <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-primary">
          Right Now
        </span>
      </h2>

      {/* Desktop Search Bar (Hidden on Mobile if overlay is preferred, but kept for responsiveness) */}
      <div className="relative w-full max-w-3xl mb-16 hidden md:block">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        <input
          className="w-full h-16 bg-surface text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-black font-bold h-12 px-8 rounded-full text-lg active:scale-95 transition-transform"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-lg z-10 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-gray-800 hover:text-primary cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Search Overlay Trigger (Optional fallback if they don't use navbar icon) */}
      <div className="md:hidden w-full max-w-md mb-12">
         <button
           onClick={() => setIsSearchOverlayOpen(true)}
           className="w-full flex items-center gap-3 bg-surface border border-gray-700 rounded-full p-4 text-text-secondary active:scale-95 transition-transform"
         >
           <Search className="w-5 h-5" />
           <span>Search exercises...</span>
         </button>
      </div>

      {/* Full Screen Mobile Search Overlay */}
      {isSearchOverlayOpen && (
        <div className="fixed inset-0 z-[60] bg-background pt-safe pb-safe flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 flex items-center gap-3 border-b border-gray-800">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 id="mobile-search-input"
                 className="w-full bg-surface text-text-primary rounded-full py-3 pl-10 pr-4 focus:outline-none border border-primary/50"
                 placeholder="Search..."
                 value={search}
                 onChange={handleInputChange}
                 onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
                 type="search"
                 autoFocus
               />
            </div>
            <button
              onClick={() => setIsSearchOverlayOpen(false)}
              className="text-primary font-medium p-2"
            >
              Cancel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {suggestions.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-4 bg-surface rounded-xl text-text-primary active:scale-95 transition-transform capitalize flex items-center gap-3"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : search.length > 1 ? (
               <p className="text-center text-text-secondary mt-10">No results found for "{search}"</p>
            ) : (
               <p className="text-center text-text-secondary mt-10 text-sm">Start typing to search 1300+ exercises, muscles, and equipment.</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ Container for the scrollbar. The key is that the scrollbar itself is now also `relative` */}
      <div className="relative w-full max-w-7xl">
        {/* ✅ These gradients now sit at a lower z-index, behind the scrollbar's arrows */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-0 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-0 pointer-events-none" />
      </div>
    </section>
  );
};

export default SearchExercises;
