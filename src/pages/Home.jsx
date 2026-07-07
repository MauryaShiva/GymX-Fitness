import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";

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
  duration: 0.5
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
  // ✅ State ab local data se initialize ho raha hai
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");
  const location = useLocation();

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

  useEffect(() => {
    // Check for search term in location state (from MobileSearchOverlay)
    if (location.state?.executeSearch) {
      handleSearch(location.state.executeSearch);

      // Clear the state so it doesn't trigger again on reload
      window.history.replaceState({}, document.title)
    }

    // Listen for custom event
    const handleCustomSearch = (e) => {
      if (e.detail) {
        handleSearch(e.detail);
      }
    };

    window.addEventListener('execute-search', handleCustomSearch);
    return () => window.removeEventListener('execute-search', handleCustomSearch);
  }, [location.state]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      <HeroBanner />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SearchExercises
          // ✅ Naye functions ko as a prop pass karein
          onSearch={handleSearch}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartChange}
        />
      </motion.div>

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
    </motion.div>
  );
};

export default Home;
