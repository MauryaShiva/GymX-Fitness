import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full h-[400px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-xl group transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 block"
    >
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-black text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-black text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
