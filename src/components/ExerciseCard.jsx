import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative block w-full max-w-[350px] mx-auto aspect-[3/4] bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group"
    >
      {/* Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-text-primary">
        {/* Tags with a modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-4">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name with improved typography */}
        <h3 className="font-extrabold capitalize text-2xl md:text-3xl tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
