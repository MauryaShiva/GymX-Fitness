import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-[350px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full h-[400px] sm:h-[450px] bg-gray-900 rounded-2xl overflow-hidden shadow-xl group border border-gray-800"
      >
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-600/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-gray-800/90 text-gray-200 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md border border-gray-700">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-extrabold capitalize text-2xl sm:text-3xl tracking-tight leading-tight">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
