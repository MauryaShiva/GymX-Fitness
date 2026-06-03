import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
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
      alert("Please select a valid exercise, body part, or equipment.");
    }
  };

  return (
    <section className="flex flex-col justify-center h-full w-full px-6">
      {/* Heading - text-slate-950 */}
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-950">
          Find Your Perfect
          <br />
          <span className="text-red-600">Workout Routine</span>
        </h2>

        <p className="text-slate-800 mt-4 text-sm max-w-md">
          Search exercises by muscle group, equipment, or workout name and build
          the perfect training routine.
        </p>
      </div>

      {/* Search Box */}
      <div className="relative w-full max-w-lg mb-10">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
          <Search size={18} />
        </div>

        <input
          className="w-full h-12 bg-white border border-slate-300 rounded-full text-slate-950 placeholder-slate-500 pl-12 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition shadow-sm"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        />

        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-medium h-9 px-6 rounded-full text-sm transition transform hover:scale-105"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-slate-900 hover:bg-red-600 hover:text-white cursor-pointer transition capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full max-w-5xl">
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
