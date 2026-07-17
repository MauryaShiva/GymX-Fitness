import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  duration: 0.3
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // ✅ State ab local data se initialize ho raha hai
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");

  useEffect(() => {
    // Check if we navigated here with the search param
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("search") === "true") {
      // Remove param from URL without triggering a re-render
      navigate("/", { replace: true });
      // Small timeout to allow the component to mount and event listener to attach
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-search"));
      }, 300);
    }
  }, [location, navigate]);

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
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full flex flex-col gap-6"
    >
      <HeroBanner />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
        viewport={{ once: true, amount: 0.1 }}
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
