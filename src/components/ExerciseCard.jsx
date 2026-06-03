import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container wrapped in Framer Motion for tap/hover effects
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full h-[220px] md:h-[280px] lg:h-[350px] bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-lg group border border-gray-700"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block w-full h-full"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white pointer-events-none">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
            <span className="bg-red-500/80 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-2 md:py-1.5 md:px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/80 text-white text-[10px] md:text-xs font-semibold rounded-full capitalize py-1 px-2 md:py-1.5 md:px-3 border border-gray-700 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-sm md:text-lg lg:text-xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
