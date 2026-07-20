import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use framer-motion's motion.create to wrap react-router's Link
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full sm:w-[350px] h-[400px] sm:h-[450px] bg-white dark:bg-surface rounded-2xl overflow-hidden shadow-md dark:shadow-none border border-gray-100 dark:border-gray-800 group transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-primary/10 block"
    >
      {/* Container for the GIF to maintain aspect ratio and fit properly */}
      <div className="w-full h-full relative overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:opacity-90 transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Modern gradient overlay focused at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-red-500/90 text-white text-[10px] md:text-xs font-bold tracking-wide rounded-full uppercase py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/90 text-white text-[10px] md:text-xs font-bold tracking-wide rounded-full uppercase py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
