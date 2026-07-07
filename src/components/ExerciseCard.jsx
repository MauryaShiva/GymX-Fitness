import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] h-[400px] sm:h-[450px] bg-gray-900 rounded-2xl overflow-hidden shadow-lg group border border-gray-800 shrink-0 mx-auto"
    >
      <Link
        to={`/exercise/${exercise.exerciseId || exercise.id}`}
        className="block w-full h-full relative"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <div className="w-full h-full bg-white flex items-center justify-center p-4">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 mix-blend-multiply"
          />
        </div>

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row gap-2 mb-3 flex-wrap">
            <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm border border-red-400/30">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm border border-yellow-400/30">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
