import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.96 }}
      className="w-full sm:w-[350px] mx-auto h-[400px] sm:h-[450px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-full bg-gray-900 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] group"
      >
        {/* Skeleton/Placeholder background while loading */}
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />

        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="relative w-full h-full object-cover z-10 transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-30 pointer-events-none">
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-red-600/90 text-white text-xs font-bold tracking-wide rounded-full uppercase py-1.5 px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-black text-xs font-bold tracking-wide rounded-full uppercase py-1.5 px-3 backdrop-blur-md shadow-sm">
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
