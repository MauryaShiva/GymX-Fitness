import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full sm:w-[350px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-[320px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover bg-white transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row flex-wrap gap-2 mb-2 sm:mb-3">
            <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
