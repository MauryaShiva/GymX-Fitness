import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

import allExercisesData from "../data/exercises.json"; // Local data import
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

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
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Fuse.js setup for smart search
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
    setIsSearchOverlayOpen(false); // Close overlay after search
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

  useEffect(() => {
    const handleGlobalSearch = () => {
      setIsSearchOverlayOpen(true);
    };

    window.addEventListener('global-search', handleGlobalSearch);

    return () => {
      window.removeEventListener('global-search', handleGlobalSearch);
    };
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="relative"
    >
      <HeroBanner />

      {/* Floating Action Button for Mobile Search (Optional, if you want an explicit button besides the header) */}
      <button
        className="md:hidden fixed bottom-20 right-4 z-40 bg-red-600 text-white p-4 rounded-full shadow-xl shadow-red-600/30 active:scale-95 transition-transform"
        onClick={() => setIsSearchOverlayOpen(true)}
      >
        <Search className="w-6 h-6" />
      </button>

      {/* Desktop Search / Inline Search */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden md:block" // Hide inline on mobile
      >
        <SearchExercises
          onSearch={handleSearch}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartChange}
          isOverlay={false}
        />
      </motion.div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOverlayOpen && (
          <SearchExercises
            onSearch={handleSearch}
            bodyPart={bodyPart}
            setBodyPart={handleBodyPartChange}
            isOverlay={true}
            onClose={() => setIsSearchOverlayOpen(false)}
          />
        )}
      </AnimatePresence>

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
    </motion.div>
  );
};

export default Home;
