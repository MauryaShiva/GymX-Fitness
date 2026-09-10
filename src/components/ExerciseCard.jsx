import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] h-[400px] md:h-[450px] bg-gray-900 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-800 group block mx-auto"
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 bg-white"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-red-600/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-800/90 text-gray-200 text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md border border-gray-700 shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
