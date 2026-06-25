import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

import allExercisesData from "../data/exercises.json";
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";
import MobileSearchOverlay from "../components/MobileSearchOverlay.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const fuse = new Fuse(allExercisesData, {
    keys: ["name", "targetMuscles", "equipments", "bodyParts"],
    threshold: 0.4,
  });

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

    // Scroll to exercises section after search
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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

  // Listen for the custom event to open mobile search
  useEffect(() => {
    const openSearch = () => setIsMobileSearchOpen(true);
    window.addEventListener('global-search', openSearch);
    return () => window.removeEventListener('global-search', openSearch);
  }, []);

  return (
    <div>
      <HeroBanner />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden md:block" // Hide desktop search on mobile to prevent duplicate UI
      >
        <SearchExercises
          onSearch={handleSearch}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartChange}
        />
      </motion.div>

      {/* Adding a mobile-specific category selector since we hid SearchExercises which contained the categories */}
      <div className="md:hidden pt-8 px-4">
        <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
        <div className="flex overflow-x-auto pb-4 gap-3 snap-x hide-scrollbar">
           {/* 'all' option */}
          <button
              onClick={() => handleBodyPartChange('all')}
              className={`snap-center shrink-0 px-6 py-2 rounded-full font-medium transition-colors ${
                bodyPart === 'all'
                  ? 'bg-primary text-background'
                  : 'bg-surface text-gray-300 border border-gray-700'
              }`}
            >
              All
          </button>

          {/* Deduplicate and map body parts from exercises data */}
          {Array.from(new Set(allExercisesData.flatMap(ex => ex.bodyParts))).map(part => (
             <button
              key={part}
              onClick={() => handleBodyPartChange(part)}
              className={`snap-center shrink-0 px-6 py-2 rounded-full font-medium capitalize transition-colors ${
                bodyPart === part
                  ? 'bg-primary text-background'
                  : 'bg-surface text-gray-300 border border-gray-700'
              }`}
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Exercises
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </motion.div>

      <MobileSearchOverlay
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Home;
