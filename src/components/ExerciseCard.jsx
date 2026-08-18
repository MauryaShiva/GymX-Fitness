import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use motion.create for Framer Motion v12+ compatibility with custom components
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative block w-full max-w-[350px] mx-auto sm:w-[350px] aspect-[4/5] bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-lg group border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-white/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30 text-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-[var(--color-primary)]/90 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-md py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-blue-600/90 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-md py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
