import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="relative w-full max-w-[350px] sm:w-[350px] aspect-[4/5] sm:h-[450px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg group mx-auto block"
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-bold tracking-wider rounded-full uppercase py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/90 text-white text-[10px] sm:text-xs font-bold tracking-wider rounded-full uppercase py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
