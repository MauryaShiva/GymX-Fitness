import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] h-[450px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group transition-all duration-300 ease-in-out hover:shadow-red-500/20"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 bg-white"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex flex-row gap-2 mb-3">
          <span className="bg-red-600/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-800/90 text-gray-200 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg border border-gray-700">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl tracking-tight leading-tight text-white shadow-sm">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
