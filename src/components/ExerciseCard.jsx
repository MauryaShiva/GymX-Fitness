import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use Framer Motion v12 syntax to wrap custom components
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] mx-auto h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800 touch-manipulation"
    >
      {/* Image with subtle zoom on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      {/* Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-text-primary z-10">
        {/* Tags with modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-background text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
