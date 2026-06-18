import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="w-full max-w-[350px] mx-auto sm:max-w-none"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full aspect-[3/4] sm:h-[450px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg group transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-500/20"
      >
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out md:group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-white text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
