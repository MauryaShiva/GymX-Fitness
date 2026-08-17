import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="relative w-full max-w-[350px] sm:w-[350px] h-[350px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group transition-shadow duration-300 hover:shadow-primary/20 block"
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-text-primary">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-row gap-2 mb-3 flex-wrap">
          <span className="bg-primary/80 text-background text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/80 text-background text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
