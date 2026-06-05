import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // Wrap with framer-motion for smooth tap/hover native app feel
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full h-[400px] sm:h-[450px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700/50 group"
      >
        {/* Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* Tags with a modern, semi-transparent background */}
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-600/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm border border-red-500/30">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-gray-700/90 text-gray-100 text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm border border-gray-600/50">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* Exercise name with improved typography */}
          <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
