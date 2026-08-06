import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  const MotionLink = motion.create(Link);

  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] mx-auto h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 block border border-gray-800"
    >
      {/* Image with zoom effect */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Improved gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-primary/90 text-background text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-background text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl md:text-3xl tracking-tight leading-tight text-white drop-shadow-md">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
