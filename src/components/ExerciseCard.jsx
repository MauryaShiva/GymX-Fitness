import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use motion.create for Framer Motion v12+ support
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full max-w-[350px] aspect-[4/5] bg-surface rounded-2xl overflow-hidden shadow-lg group mx-auto block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Image Container with bg-white to ensure GIFs display well */}
      <div className="w-full h-full bg-white relative">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105 mix-blend-multiply"
        />
        {/* Subtle dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0" />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Text content positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-text-primary z-10">
        {/* Tags with a modern, semi-transparent background */}
        <div className="flex flex-row gap-2 mb-3">
          <span className="bg-primary/80 text-background text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 border border-gray-600 text-text-primary text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white drop-shadow-md line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
