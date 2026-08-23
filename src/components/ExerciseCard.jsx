import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full aspect-[4/5] sm:w-[350px] sm:h-[450px] bg-surface rounded-3xl overflow-hidden shadow-xl shadow-black/40 group block border border-gray-700/50"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-lg shadow-primary/20">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-700/90 text-white text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md border border-gray-600/50">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-black capitalize text-xl sm:text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
