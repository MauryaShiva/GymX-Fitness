import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] h-[400px] md:h-[450px] bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-xl group border border-gray-800 block mx-auto"
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
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-red-600/90 text-white text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-lg">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-700/80 text-white text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
