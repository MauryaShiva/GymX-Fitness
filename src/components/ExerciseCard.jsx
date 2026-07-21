import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-xl group border border-gray-800"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-red-500/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-primary/90 text-black text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md shadow-lg">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl md:text-3xl tracking-tight leading-tight line-clamp-2 drop-shadow-md">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
