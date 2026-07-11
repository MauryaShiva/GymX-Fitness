import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="w-full md:w-[350px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-[400px] md:h-[450px] bg-surface border border-gray-800 rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-500/10"
      >
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex flex-row gap-2 mb-3 flex-wrap">
            <span className="bg-red-500/80 text-white text-[10px] md:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/80 text-white text-[10px] md:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
