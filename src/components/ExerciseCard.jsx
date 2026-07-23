import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full aspect-[3/4] max-w-[350px] mx-auto bg-surface rounded-2xl overflow-hidden shadow-lg shadow-black/40 group block border border-gray-800"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover bg-white"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      {/* Content container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-text-primary">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
