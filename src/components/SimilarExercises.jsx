import React from "react";
import { motion } from "framer-motion";
import Loader from "./Loader.jsx";
import ExerciseCard from "./ExerciseCard.jsx";

const HorizontalScrollWrapper = ({ data }) => (
  <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 px-2">
    {data.slice(0, 10).map((exercise) => (
      <div
        key={exercise.exerciseId}
        className="min-w-[300px] sm:min-w-[320px] flex-shrink-0"
      >
        <ExerciseCard exercise={exercise} size="small" />
      </div>
    ))}
  </div>
);

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <motion.section
      className="mt-12 lg:mt-24 px-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">
        Exercises that target the same{" "}
        <span className="text-red-500 capitalize">muscle group</span>
      </h2>

      {/* ✅ Added a div with margin-top to create space */}
      <div className="mt-8">
        {targetMuscleExercises.length ? (
          <HorizontalScrollWrapper data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mt-16 mb-8 text-white">
        Exercises that use the same{" "}
        <span className="text-red-500 capitalize">equipment</span>
      </h2>

      {/* ✅ Added a div with margin-top to create space */}
      <div className="mt-8">
        {equipmentExercises.length ? (
          <HorizontalScrollWrapper data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </div>
    </motion.section>
  );
};

export default SimilarExercises;
