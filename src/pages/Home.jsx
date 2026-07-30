import React, { useState } from "react";
import { motion } from "framer-motion";
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
  // ✅ State ab local data se initialize ho raha hai
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");

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
    <div>
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
    </div>
  );
};

export default Home;
