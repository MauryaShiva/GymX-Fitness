import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative block w-full max-w-[350px] h-[400px] md:h-[450px] mx-auto bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800 group"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Image with a subtle zoom effect on hover */}
      <div className="w-full h-full bg-white">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>

      {/* Content container positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end pointer-events-none">
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md border border-primary-dark">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 text-gray-200 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md border border-gray-700">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2 drop-shadow-md">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
