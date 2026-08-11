import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.96 }}
      className="relative w-full max-w-[350px] mx-auto h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 block border border-gray-800"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>

      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex flex-row flex-wrap gap-2 mb-4">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3.5 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/90 border border-gray-700 text-text-primary text-xs font-bold rounded-full capitalize py-1.5 px-3.5 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
