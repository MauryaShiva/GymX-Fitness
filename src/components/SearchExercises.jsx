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

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Listen for the global search event
  useEffect(() => {
    const handleGlobalSearch = () => {
      // If we are not on the home page, the user might need to navigate first,
      // but since this component is only on Home, this is safe.
      setIsSearchFocused(true);
      document.getElementById("search-exercises-section")?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("global-search", handleGlobalSearch);
    return () => window.removeEventListener("global-search", handleGlobalSearch);
  }, []);

  return (
    // ✅ Maintained the background gradient, modified padding for mobile
    <section id="search-exercises-section" className="flex flex-col items-center mt-0 md:mt-12 px-4 md:p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 md:py-20 rounded-none md:rounded-3xl">
      {/* ✅ Enhanced typography for a more impactful heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        {/* ✅ Made the gradient text more vibrant */}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
          Right Now
        </span>
      </h2>

      {/* Full screen overlay search wrapper on mobile when focused */}
      <div className={`
        ${isSearchFocused ? 'fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-xl p-4 pt-safe flex flex-col' : 'relative w-full max-w-3xl mb-8 md:mb-16'}
        transition-all duration-300 ease-in-out
      `}>

        {isSearchFocused && (
          <div className="flex justify-between items-center mb-6 w-full">
            <h3 className="text-xl font-bold text-white">Search</h3>
            <button
              onClick={() => setIsSearchFocused(false)}
              className="text-gray-400 hover:text-white p-2"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="relative w-full">
          {/* ✅ Using a modern icon from lucide-react */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          {/* ✅ Revamped the input for a glassy, modern look */}
          <input
            className="w-full h-14 md:h-16 bg-gray-800/80 text-white placeholder-gray-400 border border-gray-700 rounded-2xl md:rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-inner"
            value={search}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search exercises..."
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLocalSearch();
                setIsSearchFocused(false);
              }
            }}
          />
          {/* ✅ Upgraded the button with a gradient and interactive effects */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-10 md:h-12 px-4 md:px-8 rounded-xl md:rounded-full text-sm md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            onClick={() => {
              handleLocalSearch();
              setIsSearchFocused(false);
            }}
          >
            Search
          </button>
        </div>

        {/* ✅ Styled the suggestions dropdown for a better look and feel */}
        {suggestions.length > 0 && (
          <ul className={`
            ${isSearchFocused ? 'static mt-6 flex-1 bg-transparent border-none shadow-none' : 'absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl'}
            z-10 text-left overflow-y-auto max-h-[60vh] md:max-h-80
          `}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setIsSearchFocused(false);
                }}
                className={`
                  px-5 py-4 md:py-3 text-gray-300 hover:bg-red-600/20 hover:text-white cursor-pointer transition-colors duration-200 capitalize
                  ${isSearchFocused ? 'border-b border-gray-800/50 last:border-0' : ''}
                  ${index === 0 && !isSearchFocused ? 'rounded-t-2xl' : ''}
                  ${index === suggestions.length - 1 && !isSearchFocused ? 'rounded-b-2xl' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-gray-500" />
                  {suggestion}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Container for the scrollbar. */}
      <div className="relative w-full max-w-7xl mt-4 md:mt-0">
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </div>
    </section>
  );
};

export default SearchExercises;
