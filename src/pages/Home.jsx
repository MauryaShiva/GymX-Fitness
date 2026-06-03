import React, { useState } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

import allExercisesData from "../data/exercises.json";
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Home = () => {
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");

  const fuse = new Fuse(allExercisesData, {
    keys: ["name", "targetMuscles", "equipments", "bodyParts"],
    threshold: 0.4,
  });

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setExercises(allExercisesData);
      setBodyPart("all");
      return;
    }

    const results = fuse.search(searchTerm);
    const searchedExercises = results.map((result) => result.item);

    setExercises(searchedExercises);
    setBodyPart(searchTerm);
  };

  const handleBodyPartChange = (part) => {
    setBodyPart(part);

    if (part === "all") {
      setExercises(allExercisesData);
    } else {
      const filtered = allExercisesData.filter((exercise) =>
        exercise.bodyParts
          .map((bp) => bp.toLowerCase())
          .includes(part.toLowerCase()),
      );

      setExercises(filtered);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* HERO SECTION - Using a very soft gray instead of deep gradients */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-start"
          >
            <HeroBanner />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <SearchExercises
              onSearch={handleSearch}
              bodyPart={bodyPart}
              setBodyPart={handleBodyPartChange}
            />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-slate-200"></div>

      {/* EXERCISES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Heading - Changed to text-slate-950 for pure dark visibility */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-wide">
              Explore Our Exercises
            </h2>

            {/* Paragraph - Changed to text-slate-800 (much darker than before) */}
            <p className="text-slate-800 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Discover a wide range of exercises for every muscle group. Search
              and filter workouts to build the perfect routine.
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Exercises exercises={exercises} bodyPart={bodyPart} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
