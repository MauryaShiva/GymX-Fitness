import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use framer-motion v12 syntax for creating a motion component from a custom external component
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full sm:w-[350px] h-[400px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg border border-border group block"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Image Container with explicit background to prevent flash on load */}
      <div className="w-full h-full bg-surface-hover relative">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-text-primary z-10 flex flex-col justify-end">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm border border-primary-hover">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 text-text-primary text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md border border-border">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
