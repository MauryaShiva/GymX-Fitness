import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use motion.create for Framer Motion v12+ wrapping a custom component
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise, size = "default" }) => {
  const isSmall = size === "small";
  const cardWidth = isSmall ? "w-[280px]" : "w-full max-w-[350px] sm:w-[350px]";
  const cardHeight = isSmall ? "h-[360px]" : "h-[400px] sm:h-[450px]";

  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)" }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${cardWidth} ${cardHeight} mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out block`}
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
          <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-amber-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
