import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full h-full"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full max-w-[350px] aspect-[4/5] mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-xl group"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 aspect-video"
        />

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-500/80 text-white text-xs font-semibold rounded-full capitalize py-2 px-4 backdrop-blur-sm min-h-[44px] min-w-[44px] flex items-center justify-center">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/80 text-white text-xs font-semibold rounded-full capitalize py-2 px-4 backdrop-blur-sm min-h-[44px] min-w-[44px] flex items-center justify-center">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2 min-h-[44px] flex items-center">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
