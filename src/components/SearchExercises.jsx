import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart, isMobileOverlay = false }) => {
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

  return (
    <section className={`flex flex-col items-center text-center ${isMobileOverlay ? 'w-full' : 'mt-12 p-5 bg-gradient-to-b from-black via-gray-900 to-black text-white py-20'}`}>

      {!isMobileOverlay && (
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
          Find Your Perfect Workout, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Right Now
          </span>
        </h2>
      )}

      <div className={`relative w-full ${isMobileOverlay ? '' : 'max-w-3xl mb-16'}`}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-5 w-5 md:h-6 md:w-6" />
        </div>

        <input
          className={`w-full h-14 md:h-16 bg-surface text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-12 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 ${isMobileOverlay ? 'shadow-inner' : ''}`}
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
          autoFocus={isMobileOverlay}
        />

        <button
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-11 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg active:scale-95 transform transition-all duration-300 shadow-md md:shadow-lg shadow-red-500/20"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className={`absolute ${isMobileOverlay ? 'top-16' : 'top-full mt-2'} w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden max-h-60 overflow-y-auto`}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 md:py-4 border-b border-gray-800 last:border-0 text-text-secondary hover:bg-primary/20 hover:text-text-primary active:bg-primary/30 cursor-pointer transition-colors duration-200 capitalize text-sm md:text-base flex items-center"
              >
                <Search className="h-4 w-4 mr-3 opacity-50" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isMobileOverlay && <h3 className="w-full text-left font-bold text-gray-400 mt-8 mb-4 uppercase text-xs tracking-wider">Categories</h3>}

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
