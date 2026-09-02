import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise, size = "default" }) => {
  const isSmall = size === "small";

  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800 ${
        isSmall ? "w-[280px] h-[350px]" : "w-full max-w-[380px] h-[400px] md:h-[450px]"
      }`}
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
