import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative block w-full aspect-[3/4] sm:w-[350px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-white">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-text-primary z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-background text-xs font-bold rounded-full capitalize py-1 px-3 shadow-sm border border-primary/20 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/90 text-text-primary text-xs font-bold rounded-full capitalize py-1 px-3 shadow-sm border border-gray-700 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl tracking-tight line-clamp-2 leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
