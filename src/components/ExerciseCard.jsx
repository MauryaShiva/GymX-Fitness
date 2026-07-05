import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="w-full max-w-[350px] mx-auto"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800 group"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-500 text-white text-xs font-bold rounded-md uppercase tracking-wider py-1.5 px-3 shadow-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-surface-glass border border-gray-700 text-gray-200 text-xs font-semibold rounded-md capitalize py-1.5 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
