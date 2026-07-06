import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { useLocation } from "react-router-dom";

import allExercisesData from "../data/exercises.json";
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
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");
  const location = useLocation();

  const handleSearch = useCallback((searchTerm) => {
    if (searchTerm === "") {
      setExercises(allExercisesData);
      setBodyPart("all");
      return;
    }
    const fuse = new Fuse(allExercisesData, {
      keys: ["name", "targetMuscles", "equipments", "bodyParts"],
      threshold: 0.4,
    });
    const results = fuse.search(searchTerm);
    const searchedExercises = results.map((result) => result.item);
    setExercises(searchedExercises);
    setBodyPart(`${searchTerm}`);
  }, []);

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
    // Check if we came from MobileSearchOverlay
    if (location.state?.executeSearch) {
      handleSearch(location.state.executeSearch);

      // Clear the state so it doesn't re-trigger on un-related re-renders
      window.history.replaceState({}, document.title)

      // Scroll to exercises section
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state, handleSearch]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pb-safe"
    >
      <HeroBanner />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SearchExercises
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
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </motion.div>
    </motion.div>
  );
};

export default Home;
