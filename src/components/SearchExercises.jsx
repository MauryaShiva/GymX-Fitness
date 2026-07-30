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

  return (
    // ✅ Added a background gradient and padding for a better section feel
    <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
      {/* ✅ Enhanced typography for a more impactful heading */}
      <h2 className="text-4xl lg:text-6xl font-extrabold mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        {/* ✅ Made the gradient text more vibrant */}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
          Right Now
        </span>
      </h2>

      <div className="relative w-full max-w-3xl mb-16">
        {/* ✅ Using a modern icon from lucide-react */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-6 w-6" />
        </div>
        {/* ✅ Revamped the input for a glassy, modern look */}
        <input
          className="w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        {/* ✅ Upgraded the button with a gradient and interactive effects */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* ✅ Styled the suggestions dropdown for a better look and feel */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-10 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200 capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

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
