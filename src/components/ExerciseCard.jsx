import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full sm:w-[350px] h-[400px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-xl shadow-black/50 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 block"
    >
      {/* Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-[65%] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 bg-white"
      />

      {/* Gradient overlay to blend image into the dark card body */}
      <div className="absolute top-[35%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-surface pointer-events-none"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] p-5 flex flex-col justify-end bg-surface">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 shadow-md shadow-primary/30">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-700/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 shadow-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;