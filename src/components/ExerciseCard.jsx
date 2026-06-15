import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise, size = "large" }) => {
  const containerSize =
    size === "small"
      ? "w-[280px] sm:w-[300px] h-[350px]"
      : "w-full max-w-[350px] h-[400px] sm:h-[450px]";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      className="h-full w-full mx-auto"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className={`relative block ${containerSize} mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20`}
      >
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white z-10">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
