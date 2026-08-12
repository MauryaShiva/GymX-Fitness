import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[350px] aspect-[4/5] bg-surface rounded-2xl overflow-hidden shadow-xl shadow-black/50 group transition-all duration-300 mx-auto"
    >
      {/* Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

      {/* Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* Tags with a modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          {exercise.bodyParts?.[0] && (
            <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
          )}
          {exercise.targetMuscles?.[0] && (
            <span className="bg-surface-light/90 border border-gray-600 text-gray-200 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          )}
        </div>

        {/* Exercise name with improved typography */}
        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
