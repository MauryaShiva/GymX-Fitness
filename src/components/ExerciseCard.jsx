import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.96 }}
      className="w-full sm:w-[350px] h-[400px] sm:h-[450px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800 group transition-all duration-300 hover:shadow-red-500/20"
      >
        {/* Image with zoom effect */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 bg-white"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
          {/* Tags */}
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-600/90 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-gray-800/90 border border-gray-700 text-gray-200 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* Exercise Name */}
          <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
