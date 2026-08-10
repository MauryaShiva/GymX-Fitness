import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use Framer Motion's new API for wrapping external components in v12+
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full max-w-[350px] mx-auto h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Exercise Image with zoom effect */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2 mb-4">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg text-black">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className="font-extrabold capitalize text-2xl tracking-tight leading-tight mb-2 drop-shadow-md">
          {exercise.name}
        </h3>

        {/* Subtle indicator for action */}
        <div className="w-8 h-1 bg-primary rounded-full transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-300 mt-3"></div>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
