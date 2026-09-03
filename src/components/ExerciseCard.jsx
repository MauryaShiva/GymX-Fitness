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
      className="relative w-full max-w-[350px] mx-auto h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 group block"
    >
      {/* Image with subtle zoom on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 bg-white"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-1/2">
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 border border-gray-600 text-text-primary text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold capitalize text-2xl md:text-3xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
