import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full aspect-[4/5] sm:h-[400px] bg-surface rounded-2xl overflow-hidden shadow-lg group transition-all duration-300"
      >
        {/* GIF Background Container */}
        <div className="absolute inset-0 bg-white">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105 mix-blend-multiply"
          />
        </div>

        {/* Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full">
          {/* Tags with a modern, semi-transparent background */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight text-text-primary line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
