import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full max-w-[350px] h-[300px] sm:h-[400px] md:h-[450px] mx-auto bg-surface rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] group block focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {/* Background Image */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
          <span className="bg-primary/90 text-black text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight text-white line-clamp-2 drop-shadow-md">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
