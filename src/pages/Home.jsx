import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";

import allExercisesData from "../data/exercises.json"; // Local data import
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  const location = useLocation();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");

  // Handle cross-page search triggers from Navbar or other components
  useEffect(() => {
    if (location.state?.openSearch) {
      setIsMobileSearchOpen(true);
      // Clean up the state so it doesn't reopen on refresh
      window.history.replaceState({}, document.title);
    }

    // Also listen for custom events
    const handleExecuteSearch = (e) => {
      handleSearch(e.detail);
    };
    window.addEventListener('execute-search', handleExecuteSearch);
    return () => window.removeEventListener('execute-search', handleExecuteSearch);
  }, [location]);

  // Fuse.js setup for smart search
  const fuse = new Fuse(allExercisesData, {
    keys: ["name", "targetMuscles", "equipments", "bodyParts"],
    threshold: 0.4,
  });

  // ✅ Filtering aur searching ka saara logic ab yahan hai
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setExercises(allExercisesData);
      setBodyPart("all");
      return;
    }
    const results = fuse.search(searchTerm);
    const searchedExercises = results.map((result) => result.item);
    setExercises(searchedExercises);
    setBodyPart(`${searchTerm}`);
  };

  const handleBodyPartChange = (part) => {
    setBodyPart(part);
    if (part === "all") {
      setExercises(allExercisesData);
    } else {
      const filtered = allExercisesData.filter((exercise) =>
        exercise.bodyParts
          .map((bp) => bp.toLowerCase())
          .includes(part.toLowerCase())
      );
      setExercises(filtered);
    }
  };

  return (
    <div className="relative">
      <HeroBanner />

      {/* Desktop Search / Inline Search for larger screens */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden md:block"
      >
        <SearchExercises
          onSearch={handleSearch}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartChange}
        />
      </motion.div>

      {/* Mobile Inline Search Button */}
      <div className="md:hidden px-4 mt-8 flex justify-center">
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="w-full h-14 bg-surface rounded-full flex items-center px-6 shadow-md border border-gray-700/50"
        >
          <span className="text-gray-400">Search exercises, muscles...</span>
        </button>
      </div>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden overflow-y-auto"
          >
            <div className="pt-safe px-4 pb-24 h-full flex flex-col">
              <div className="flex justify-between items-center py-4 border-b border-gray-800">
                <h3 className="text-xl font-bold">Search</h3>
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2 bg-surface rounded-full"
                >
                  ✕
                </button>
              </div>
              <div className="mt-6 flex-1">
                <SearchExercises
                  onSearch={(term) => {
                    handleSearch(term);
                    setIsMobileSearchOpen(false);
                  }}
                  bodyPart={bodyPart}
                  setBodyPart={(part) => {
                    handleBodyPartChange(part);
                    setIsMobileSearchOpen(false);
                  }}
                  isMobileOverlay={true}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Exercises
          // ✅ Sirf zaroori props pass karein
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </motion.div>
    </div>
  );
};

export default Home;
