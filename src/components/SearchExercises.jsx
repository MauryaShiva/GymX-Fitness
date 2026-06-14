import React, { useEffect, useState } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
// Using lucide-react for a clean search icon. Make sure to install it: npm install lucide-react
import { Search, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  // --- All State and Logic is UNCHANGED ---
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

  // ✅ New state for mobile full-screen search
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
      setIsMobileSearchOpen(false); // Close mobile search overlay if open
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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileSearchOpen(false);
      setSuggestions([]);
    }
  };
  // --- End of Unchanged Logic ---

  return (
    // ✅ Added a background gradient and padding for a better section feel
    <section className="flex flex-col items-center mt-12 p-5 text-center bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 relative">
      {/* ✅ Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-gray-900 flex flex-col p-4 pt-safe pb-safe"
          >
            <div className="flex items-center mb-6">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="mr-4 text-gray-300 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="relative flex-grow">
                <input
                  autoFocus
                  className="w-full h-14 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-full py-2 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={search}
                  onChange={handleInputChange}
                  placeholder="Search exercises..."
                  type="text"
                  onKeyDown={handleKeyDown}
                  onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                {search && (
                   <button
                     onClick={() => { setSearch(''); setSuggestions([]); }}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                   >
                     <X className="w-5 h-5" />
                   </button>
                )}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {suggestions.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-4 bg-gray-800 rounded-xl text-left text-gray-300 hover:bg-red-600 hover:text-white active:bg-red-700 cursor-pointer capitalize min-h-[44px] flex items-center"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none hidden md:block">
          <Search className="h-6 w-6" />
        </div>

        {/* ✅ Mobile Search Trigger Button (replacing input on small screens for better UX) */}
        <button
          className="md:hidden w-full h-14 bg-gray-800/50 text-gray-400 border border-gray-700 rounded-full py-2 px-6 text-left flex items-center shadow-lg"
          onClick={() => setIsMobileSearchOpen(true)}
        >
          <Search className="h-5 w-5 mr-3" />
          Search exercises...
        </button>

        {/* ✅ Revamped the input for a glassy, modern look (Desktop only) */}
        <input
          className="hidden md:block w-full h-16 bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles, equipment..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        {/* ✅ Upgraded the button with a gradient and interactive effects (Desktop only) */}
        <button
          className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold h-12 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {/* ✅ Styled the suggestions dropdown for a better look and feel (Desktop only) */}
        {suggestions.length > 0 && !isMobileSearchOpen && (
          <ul className="hidden md:block absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-10 text-left overflow-hidden">
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
