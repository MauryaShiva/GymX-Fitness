import React from "react";
import { motion } from "framer-motion";
import Loader from "./Loader.jsx";
import ExerciseCard from "./ExerciseCard.jsx";

const HorizontalScrollWrapper = ({ data }) => (
  <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 md:pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
    {data.slice(0, 10).map((exercise) => (
      <div
        key={exercise.exerciseId}
        className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-center"
      >
        <ExerciseCard exercise={exercise} />
      </div>
    ))}
  </div>
);

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <motion.section
      className="w-full mt-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-white tracking-tight">
          Target the same <span className="text-primary capitalize">muscle group</span>
        </h2>

        <div className="relative w-full overflow-hidden">
          {targetMuscleExercises.length ? (
            <HorizontalScrollWrapper data={targetMuscleExercises} />
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-white tracking-tight">
          Use the same <span className="text-primary capitalize">equipment</span>
        </h2>

        <div className="relative w-full overflow-hidden">
          {equipmentExercises.length ? (
            <HorizontalScrollWrapper data={equipmentExercises} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SimilarExercises;
